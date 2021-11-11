const Shelter = require('../../models/Shelter');


const postByShelterDB = async id => {
    try {
        const shelter = await Shelter.findById(id)
        return shelter;
      } catch {
        throw new Error('No posts');
      }
};

module.exports= {
    postByShelterDB,
}