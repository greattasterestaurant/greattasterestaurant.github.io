// https://nuxt.com/docs/getting-started/deployment#pm2
module.exports = {
  apps: [
    {
      name: 'Great Taste',
      port: '3000',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
