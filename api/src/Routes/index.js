require('../mongo')
const { Router } = require('express')
const userNetwork = require('../components/user/network')
const postNetwork = require('../components/post/network')

const router = Router()

router.use('/user', userNetwork)
router.use('/post', postNetwork)

module.exports = router
