require('../mongo')
const {Router} = require('express')
const userNetwork = require('../components/user/network')

const router = Router();

router.use('/', userNetwork);

module.exports = router;
