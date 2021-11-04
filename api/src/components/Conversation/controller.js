const {createConversationDB,getConversationDB,getConversationAloneDB}  = require('./store.js')

const createConverse = async ({idRec,idEnv}) => {
  if(idRec && idEnv){
  try{
    const Converse = await createConversationDB(idRec,idEnv)
    return Converse
  }catch(err){
    throw new Error(err.message)
  }
}
else{
  throw new Error('No se ha enviado ningun id')
}
}
const getConversation = async ({ida,idb}) => {
  if(ida && idb){
  try{
    const Converse = await getConversationDB(ida,idb)
    return Converse
  }catch(err){
    return err.message
  }
}
  else if(ida || idb){
    try{
      const Converse = await getConversationAloneDB(ida||idb)
      return Converse
    }catch(err){
      return err.message
    }
  }
  else{
   throw new Error('No se ha enviado ningun id')
  }
}

module.exports = {createConverse,getConversation}