const createConversationDB  = require('./store.js')

const createConverse = async ({idRec,idEnv}) => {
  try{
    const Converse = await createConversationDB(idRec,idEnv)
    return Converse
  }catch(err){
    throw new Error(err.message)
  }
}

module.exports = createConverse