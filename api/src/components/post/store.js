const { Post } = require('../../models/Post');
const User = require('../../models/User');
const Image = require('../../models/Images');
const fs = require('fs');
const Shelter = require('../../models/Shelter');
const firebase = require('../../firebase');
const uniqid = require('uniqid');
const path = require('path');
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require('firebase/storage');

const nodemailer = require('nodemailer');


const storage = getStorage(firebase);

const createPostDB = async (
  name,
  type,
  state,
  description,
  id,
  genre,
  date,
  petImage,
  latitude,
  longitude
) => {
  try {
    const post = new Post({
      name,
      type,
      state,
      description,
      user: id,
      genre,
      date,
      latitude,
      longitude,
    });
    // console.log(petImage);
    if (petImage) {
      const fileName = uniqid() + path.extname(petImage.originalname);
      const fileRef = ref(storage, fileName);
      await uploadBytes(fileRef, petImage.buffer);

      const url = await getDownloadURL(fileRef);

      const image = new Image({
        url,
        name: fileName,
      });
      image.save();
      post.petImage = image;
    }

    await post.save();
    try{
      const userById = await User.findById(id);
      userById.posts.push(post);
      await userById.save();
    }
    catch{
      const shelterId = await Shelter.findById(id);
      shelterId.posts.push(post);
      await shelterId.save();
    }
    return post;
  } catch (e) {
    throw new Error(e.message);
  }
};

const findPostDB = async id => {
  try {
    const post = id
      ? await Post.findById(id).populate('petImage')
      : await Post.find().populate('petImage');
    return post;
  } catch (error) {
    throw new Error(error);
  }
};

const findReportedP = async id => {
  try{
    const post = await Post.findById(id)
    console.log(post.reportCounter)
    if(post.reportCounter <= 2){
      post.reportCounter = post.reportCounter + 1
      await post.save()
    }else{
      let id = post.user.toString()
      let usuario = await User.findById(id);
      try{
        console.log("mAIL ES ", usuario.username)
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "huellitas.dom@gmail.com",
            pass: process.env.NODEMAILER //Falta ponerlo en env
          }
        })
        console.log("ENV", process.env.NODEMAILER)
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
    return post;
  }catch(err){
    throw new Error(err.message)
  }
}

const editPostDB = async (_id, name, type, state, description, genre, date) => {
  try {
    const post = await Post.findById(_id);

    post.name = name;
    post.type = type;
    post.state = state;
    post.description = description;
    post.genre = genre;
    post.date = date;
    await post.save();
    return post;
  } catch (error) {
    throw new Error(error);
  }
};

const deletePostDB = async id => {
  try {
    const post = await Post.findById(id);
    if (post !== null) {
      const image = await Image.findById(post.petImage);
      const desertRef = ref(storage, image.name);
      await deleteObject(desertRef)
        .then(r => console.log(r))
        .catch(e => console.log(e));
      await image.remove();
      await post.remove();
      return post;
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createPostDB,
  findPostDB,
  editPostDB,
  deletePostDB,
  findReportedP,
};
