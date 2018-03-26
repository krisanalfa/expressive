module.exports = {
  plugins: process.env.NODE_ENV === 'production' ? [
    require('precss'),
    require('autoprefixer')
  ] : []
}
