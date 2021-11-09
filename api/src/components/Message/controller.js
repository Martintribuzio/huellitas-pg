const {createMessageDB, findMessagesDB,findAndUpdateDB} = require('./store.js')

const createMess = async ({content, Converseid, sender}) => {
    try{
      const Mess = await createMessageDB(content, Converseid, sender)
      return Mess
    }catch(err){
      throw new Error(err.message)
    }
}

const findMess = async ({converseid}) => {
  if(converseid){
    try{
      const Mess = await findMessagesDB(converseid)
      return Mess
    }catch(err){
      throw new Error(err.message)
    }
  }
  else{
    throw new Error('No converseid')
  }
}

const findAndUpdate = async (idMessage) => {
  try{
  const mess = await findAndUpdateDB(idMessage)
  return mess
}
catch(err){
  return err
}
}

module.exports = {createMess, findMess,findAndUpdate}