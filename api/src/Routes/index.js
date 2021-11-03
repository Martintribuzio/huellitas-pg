require('../mongo')
const { Router } = require('express')
const userNetwork = require('../components/user/network')
const postNetwork = require('../components/post/network')
const conversationNetwork = require('../components/Conversation/network')
const messageNetwork = require('../components/Message/network')

const router = Router()

router.use('/user', userNetwork)
router.use('/post', postNetwork)
router.use('/conversation', conversationNetwork)
router.use('/message', messageNetwork)

module.exports = router
