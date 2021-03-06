const User = require('../../models/User')

const createUserDB = async email => {
  try {
    const user = User.findOne({ email: email })
    return user //Hacemos la comprobación para ver si ya existe un correo electrónico igual en la DB
  } catch (error) {
    throw new Error('Error al crear')
  }
} //Sospecho que este createUser no debe ir ya que el passport se encarga de esto

const searchUserDB = async email => {
  try {
    const user = await User.findOne({ email: email }) //Hacemos la comprobación para ver si ya existe un correo electrónico igual en la DB
    return user
  } catch (error) {
    throw new Error('Error al buscar')
  }
}

const searchUserByIdDB = async id => {
  try {
    const user = await User.findById(id).populate('profileImage')
    return user
  } catch (error) {
    console.log('entro aca! ')
    throw new Error('Error al buscar el usuario')
  }
}

const editProfileDB = async username => {
  try {
    const profile = await User.findOne({ username: username }).populate("profileImage")
    // console.log('encontrame el perfil ', profile)
    return profile
  } catch (err) {
    console.log(err.message)
  }
}

const postsByUserDB = async userId => {
  try {
    const user = await User.findById(userId).populate({
      path: 'posts',
      populate: {
        path: 'petImage',
      },
    })
    // console.log(user);
    return user.posts
  } catch {
    throw new Error('Mensaje')
  }
}

const confirmationDB = async id => {
  try {
    const user = await User.findById(id)
    user.confirmation = true
    await user.save()
    return user
  } catch (error) {
    throw new Error(error)
  }
}
const getSheltersDB = async () => {
  try {
    const shelters = await User.find({ type: 'shelter' }).populate(
      'profileImage'
    )
    return shelters
  } catch (error) {
    throw new Error(error)
  }
}

const getShelterDetDB = async id => {
  try {
    const shelter = await User.findById(id)
      .populate('profileImage')
      .populate({
        path: 'posts',
        populate: {
          path: 'petImage',
        },
      })
    return shelter
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  createUserDB,
  searchUserDB,
  postsByUserDB,
  searchUserByIdDB,
  confirmationDB,
  getSheltersDB,
  getShelterDetDB,
  editProfileDB,
}
