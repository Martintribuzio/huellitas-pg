const { createUserDB, postsByUserDB,searchUserByIdDB, confirmationDB } = require('./store');

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

module.exports = {
  createUser,
  postsByUser,
  getUserById,
  confirmation
};
