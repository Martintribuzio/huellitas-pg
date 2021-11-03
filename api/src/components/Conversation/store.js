const { conversation } = require('../../models/Conversation')

const createConversationDB = async (idRec,idEnv) => {
    try{
      const converse = new conversation({members:[idRec,idEnv]})
      console.log(converse)
      await converse.save()
      return converse
    }catch(err){
      throw new Error(err.message);
    }

}
const getConversationDB = async (ida,idb) => {
  try{
    const converse = await conversation.find({members: {$all:[ida,idb]}})
    if(converse.length === 0){
      return 'Conversación no encontrada'
    }else{
    return converse}
  }catch(err){
    console.log(err.message)
    throw new Error(err);
  }
}

const getConversationAloneDB = async (id) => {
  try{
    const converse = await conversation.find({members: {$in:[id]}})
    if(Object.keys(converse).length === 0){
      throw new Error('No hay conversaciones')
    }else{
    return converse}
  }catch(err){
    throw new Error(err.message);
  }
}

module.exports = {createConversationDB,getConversationDB,getConversationAloneDB}