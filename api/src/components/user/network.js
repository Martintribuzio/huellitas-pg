const userNetwork = require('express').Router()
const { createUser, postsByUser } = require('./controller')

userNetwork.get('/posts', postsByUser)
userNetwork.post('/', createUser)

module.exports = userNetwork
