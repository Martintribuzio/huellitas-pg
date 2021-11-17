const { createUserDB, postsByUserDB,searchUserByIdDB, confirmationDB,getSheltersDB, getShelterDetDB, editProfileDB } = require('./store');
const nodemailer = require('nodemailer')

const createUser = async ({ name, email, password, postalCode }) => {
  try {
    const user = await createUserDB(name, email, password, postalCode);
    return user;
  } catch (e) {
    return { e: e.message };
  }
};

const postsByUser = async id => {
  try {
    const posts = await postsByUserDB(id);
    return posts;
  } catch (e) {
    return { e: e.message };
  }
};

const getUserById = async (id) => {
  try {
    const user = await searchUserByIdDB(id);
    return user;
  } catch (e) {
    return e.message;
  }
}

const confirmation = async (id) => {
  try {
    const user = await confirmationDB(id);
    return user;
  } catch (e) {
    return e.message;
  }
}

const mailCreation = async (id, Email) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "huellitas.dom@gmail.com",
      pass: process.env.NODEMAILER 
    }
  })
  let mailDetails = {
    from: 'huellitas.dom@gmail.com',
    to: Email,
    subject: 'Confirmación de registro',
    // html: `<a href= "https://huellitas-pg.herokuapp.com/user/confirmation?id=${id}"> Pulse aquí para confirmar su cuenta</a>` //Guardar url como variable de entorno
    html: `<a href= "http://localhost:3001/user/confirmation?id=${id}"> Pulse aquí para confirmar su cuenta</a>`
  };
  transporter.sendMail(mailDetails, (error, info) => {
    if (error) {
      res.status(500).send(error.message)
    }
    else {
      return ("Email enviado")
    }
  })
}

const getShelters = async () => {
  try{
    const shelters = await getSheltersDB();
    return shelters;
  }
  catch(e){
    return e.message;
  }
}

const getShelterDet = async (id) => {
  try{
    const shelter = await getShelterDetDB(id);
    return shelter;
  }
  catch(e){
    return e.message;
  }
}

const editProfile = async (body) => {
  try{
    let profile = await editProfileDB(body.username)
    profile.name = body.name
    profile.lastname = body.lastname
    profile.address = body.address
    profile.phone = body.phone
    profile.description = body.description
    await profile.save();
    return profile
  }catch(e){
    return e.message
  }
}

module.exports = {
  createUser,
  postsByUser,
  getUserById,
  confirmation,
  mailCreation,
  getShelters,
  getShelterDet,
  editProfile
};
