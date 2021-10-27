const { createUserDB, postsByUserDB } = require('./store');

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

module.exports = {
  createUser,
  postsByUser,
};
