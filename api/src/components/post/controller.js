const {
  createPostDB,
  findPostDB,
  editPostDB,
  deletePostDB,
  findReportedP
} = require('./store');
const User = require('../../models/User');
const moment = require('moment-timezone');
const nodemailer = require('nodemailer');
const { post } = require('./network');

const createPost = async (
  { name, type, state, genre, description, id, latitude, longitude },
  petImage
) => {
  const dateARG = moment
    .tz('America/Argentina/Buenos_Aires')
    .format('YYYY-MM-DD HH:mm:ss');
  try {
    const post = await createPostDB(
      name,
      type,
      state,
      description,
      id,
      genre,
      dateARG,
      petImage,
      latitude, 
      longitude 
    );
    return post;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findPost = async id => {
  try {
    const post = await findPostDB(id);
    return post;
  } catch (error) {
    return { error: error.message };
  }
};

const editPost = async (_id, name, type, state, genre, description) => {
  try {
    const post = await findPostDB(_id);
    if (post.error) {
      return { error: post.error };
    }
    const date = moment
      .tz('America/Argentina/Buenos_Aires')
      .format('YYYY-MM-DD HH:mm:ss');
    const editPost = await editPostDB(
      _id,
      name,
      type,
      state,
      description,
      genre,
      date
    );

    return editPost;
  } catch (error) {
    return { error: error.message };
  }
};

const reportPost = async id => {
  try{
    let post = await findReportedP(id)
    return post
  }catch(err){
    throw new Error(err.message)
  }
}

const mailReport = async id => {
  try{
    console.log(id)
    let usuario = await User.findById(id)
    
    console.log("usuario es ", usuario)
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "huellitas.dom@gmail.com",
        pass: process.env.NODEMAILER //Falta ponerlo en env
      }
    })
    let mailDetails = {
      from: 'huellitas.dom@gmail.com',
      to: usuario.username,
      subject: 'Has recibido un mensaje!',
      // html: `<a href= "https://huellitas-pg.herokuapp.com/user/confirmation?id=${user._id}"> Pulse aquí para confirmar su cuenta</a>` //Guardar url como variable de entorno
      // html: `<a href= "http://localhost:3001/user/confirmation?id=${id}"> Pulse aquí para confirmar su cuenta</a>`
      text: "Tu publicacion fue eliminado por no cumplir con las reglas del dominio"
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
    throw new Error(err.message)
  }
}

const deletePost = async _id => {
  try {
    deletePostDB(_id);
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};

module.exports = { createPost, findPost, editPost, deletePost, reportPost, mailReport };
