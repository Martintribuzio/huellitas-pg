const { Post } = require('../../models/Post');
const User = require('../../models/User');
const Image = require('../../models/Images');
const fs = require('fs');
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
      const fileName = uniqid() + path.extname(petImage.originalname); //sacarle la extension al archivo
      const fileRef = ref(storage, fileName);
      await uploadBytes(fileRef, petImage.buffer); //subir la imagen a firebase

      const url = await getDownloadURL(fileRef); //me traigo la url

      const image = new Image({
        url,
        name: fileName,
      });

      image.save();
      post.petImage = image;
    }

    await post.save();
      const userById = await User.findById(id);
      userById.posts.push(post);
      await userById.save();
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
    return post;
  }catch(err){
    throw new Error(err.message)
  }
}

const editPostDB = async (_id, name, type, state, description, genre, date, petImage) => {
  try {
    //busco la imagen vieja y la borro
    const post = await Post.findById(_id).populate('petImage');
    // console.log(post)
    post.name = name;
    post.type = type;
    post.state = state;
    post.description = description;
    post.genre = genre;
    post.date = date;
    
    //deleteo la imagen
    const desertRef = ref(storage, post.petImage.name);
    deleteObject(desertRef).then(() => {
      console.log('imagen deleteada con exito')
    }).catch((error) => {
      console.log('ocurrio un error')
    });

    if (petImage) {
      const fileName = uniqid() + path.extname(petImage.originalname); //sacarle la extension al archivo
      const fileRef = ref(storage, fileName);
      await uploadBytes(fileRef, petImage.buffer); //subir la imagen a firebase

      const url = await getDownloadURL(fileRef); //me traigo la url

      const image = new Image({
        url,
        name: fileName,
      });

      image.save();
      post.petImage = image;
    }
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
