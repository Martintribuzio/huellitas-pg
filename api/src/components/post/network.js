const postNetwork = require('express').Router()
const { createPost } = require('./controller')

postNetwork.post('/', createPost)

module.exports = postNetwork
