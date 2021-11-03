const messageNetwork = require('express').Router()
const createMessage = require('./controller')

messageNetwork.post('/', async (req, res) => {
    try{
      const message = await createMessage(req.body)
      res.send(message)
    }catch(err){
      res.send(err.message)
    }
})

module.exports = messageNetwork