#
# ---- Base Images ----
FROM node:alpine AS base
# Install tini
RUN apk add --no-cache tini
# Set working directory
WORKDIR /usr/src/app
# Set tini as entrypoint
ENTRYPOINT ["/sbin/tini", "--"]
# Copy project file
COPY package*.json ./
COPY yarn.lock ./

#
# ---- Dependencies ----
FROM base AS dependencies
# Install node packages
RUN yarn install --production=true
# Copy production node_modules aside
RUN cp -R node_modules prod_node_modules
# Install ALL node_modules, including 'devDependencies'
RUN yarn install


#
# ---- Build ----
FROM dependencies AS build
# Copy app sources
COPY . .
# Building...
RUN yarn build

#
# ---- Release ----
FROM base AS release
# Copy production node_modules
COPY --from=dependencies /usr/src/app/prod_node_modules ./node_modules
# Copy app sources
COPY . .
# Cleaning up
RUN yarn cache clean \
  && rm -rf client \
  && rm -rf src
# Our app
CMD [ "yarn", "start" ]
