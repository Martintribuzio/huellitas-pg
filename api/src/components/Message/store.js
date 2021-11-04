const { message } = require('../../models/Message')

const createMessageDB = async (content, Converseid, sender) => {
    try{
      const mensaje = new message({content, Converseid, sender})
      await mensaje.save()
      return mensaje
    }catch(err){
      throw new Error(err.message)
    }
}

const findMessagesDB = async (converseid) => {
  try{
    const mensajes = await message.find({Converseid: converseid});
    if(mensajes){
    return mensajes}
    else{
      throw new Error('No existe el mensaje')
    }
  }
  catch(err){
    return err.message
  }
}

module.exports = {
  createMessageDB,
  findMessagesDB
}