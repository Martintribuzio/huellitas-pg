const messageNetwork = require('express').Router()
const {createMess, findMess,findAndUpdate,mailNotification} = require('./controller')

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
messageNetwork.put('/:idMessage', async (req,res) => {
  try{
    const message = await findAndUpdate(req.params.idMessage)
    res.send(message)
  }
  catch(err){
    res.status(404).json(err.message)
  }
})

messageNetwork.get('/mailNotification', async (req, res) => {
  try{
    let Notification = await mailNotification(req.body.receiverId);
    res.json(Notification)
  }catch(err){
    res.status(400).send(err.message)
  }
})

module.exports = messageNetwork