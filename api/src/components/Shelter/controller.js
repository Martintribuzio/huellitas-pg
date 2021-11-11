const {postByShelterDB} = require('./store');

const postsByShelter = async id => {
    try {
      const posts = await postByShelterDB(id);
      return posts;
    } catch (e) {
      return { e: e.message };
    }
  };


  module.exports={
      postsByShelter
  }