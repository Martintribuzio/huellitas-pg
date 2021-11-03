const messageNetwork = require('express').Router()
const {createMess, findMess} = require('./controller')

messageNetwork.post('/', async (req, res) => {
    try{
      const Message = await createMess(req.body)
      res.send(Message)
    }catch(err){
      res.send(err.message)
    }
})

messageNetwork.get('/:converseid', async (req, res) => {
    try{
        const messages = await findMess(req.params)
        res.send(messages)
    } catch(err){
        res.status(404).json(err.message)
    }
})

module.exports = messageNetwork