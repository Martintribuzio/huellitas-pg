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

module.exports = createConversationDB