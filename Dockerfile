#
# ---- Base Images ----
FROM node:alpine AS base
# Install tini
RUN apk add --no-cache tini
# Set our entrypoint
ENTRYPOINT [ "/sbin/tini", "--" ]
# Set working directory
WORKDIR /usr/src/app
# Copy project file
COPY package*.json ./
COPY yarn.lock ./

#
# ---- Dependencies ----
FROM base AS dependencies
# Install build tools
RUN apk add --no-cache autoconf automake build-base python
# Install node packages
RUN yarn install --production=true
# Backup
RUN mv node_modules .node_modules
# Install ALL node_modules, including 'devDependencies'
RUN yarn install

#
# ---- Build ----
FROM dependencies AS build
# Copy app sources
COPY . .
# Building...
RUN CI_BUILD=1 yarn build

#
# ---- Release ----
FROM base AS release
# Copy production node_modules
COPY --from=dependencies /usr/src/app/.node_modules ./node_modules
# Copy built app
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/public ./public
COPY --from=build /usr/src/app/views ./views
# Our app
CMD [ "yarn", "start" ]
