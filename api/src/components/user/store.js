const {User} = require('../../models/User')

const create = async (name,email,password,postalCode) => {
    try{
        const user = await User.create({name,email,password,postalCode});
        return user;
    }
    catch{
        console.log('Error al crear');
        throw new Error('Mensaje');
    }
}
module.exports = create;