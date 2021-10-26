const create = require('./store');

const funcion = async (req,res) =>{
    const {name,email,password,postalCode} = req.body;
    const user = await create(name,email,password,postalCode);
    return res.json(user);
}

module.exports = funcion;