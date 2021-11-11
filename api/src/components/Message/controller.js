const {createMessageDB, findMessagesDB,findAndUpdateDB, mailNotificator} = require('./store.js')
const nodemailer = require('nodemailer')

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

const mailNotification = async (id) => {
  try{
    let user = await mailNotificator(id)
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "huellitas.dom@gmail.com",
        pass: process.env.NODEMAILER //Falta ponerlo en env
      }
    })
    let mailDetails = {
      from: 'huellitas.dom@gmail.com',
      to: user.username,
      subject: 'Has recibido un mensaje!',
      // html: `<a href= "https://huellitas-pg.herokuapp.com/user/confirmation?id=${user._id}"> Pulse aquí para confirmar su cuenta</a>` //Guardar url como variable de entorno
      // html: `<a href= "http://localhost:3001/user/confirmation?id=${id}"> Pulse aquí para confirmar su cuenta</a>`
      text: "Has recibido un nuevo mensaje en Huellitas!"
    };
    transporter.sendMail(mailDetails, (error, info) => {
      if (error) {
        return ("Su mail no pudo ser enviado")
      }
      else {
        console.log("Email enviado")
        return ("Email enviado")
      }
    })
  }catch(err){
    return err.message
  }
}

module.exports = {createMess, findMess,findAndUpdate, mailNotification}