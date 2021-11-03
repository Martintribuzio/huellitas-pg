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

module.exports = createMessageDB