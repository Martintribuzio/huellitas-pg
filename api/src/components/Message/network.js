const messageNetwork = require('express').Router()
const { message } = require('../../models/Message')
const createMessage = require('./controller')

messageNetwork.post('/', async (req, res) => {
    try{
      const Message = await createMessage(req.body)
      res.send(Message)
    }catch(err){
      res.send(err.message)
    }
})

messageNetwork.get('/:Converseid', async (req, res) => {
    try{
        const messages = await message.find({
            Converseid: req.params.Converseid
        });
        res.status(200).send(messages)
    } catch(err){
        res.status(404).json(err)
    }
})

module.exports = message