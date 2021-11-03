const createMessageDB = require('./store.js')

const createMess = async ({content, Converseid, sender}) => {
    try{
      const Mess = await createMessageDB(content, Converseid, sender)
      return Mess
    }catch(err){
      throw new Error(err.message)
    }
}

module.exports = createMess