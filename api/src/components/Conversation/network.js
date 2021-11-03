const conversationNetwork = require('express').Router()
const { conversation } = require('../../models/Conversation')
const createConverse = require('./controller')

conversationNetwork.post('/', async (req, res) => {
  try{
    const network = await createConverse(req.body)
    res.send(network)
  }catch(err){
    res.status(404).send(err.message)
  }
})

conversationNetwork.get('/', async (req, res) => {
  try{
    const Conversation = await conversation.find({
      members: { $in: [req.body.idEnv]},
    })
    res.status(200).json(Conversation)
  }catch(err){
    res.status(404).send(err.message)
  }
})

module.exports = conversationNetwork