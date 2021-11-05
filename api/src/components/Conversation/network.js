const conversationNetwork = require('express').Router()
const { conversation } = require('../../models/Conversation')
const {createConverse, getConversation} = require('./controller')

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
    const Conversation = await getConversation(req.query)
    res.status(200).send(Conversation)
  }catch(err){
    res.status(404).send([])
  }
})

module.exports = conversationNetwork