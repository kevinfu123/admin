'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //BASE_API: '"http://localhost:8080"'
  //BASE_API: '"http://47.106.240.143/api/admin"'
  BASE_API: '"/api"' 
})
