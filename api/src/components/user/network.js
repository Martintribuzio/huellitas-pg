const userNetwork = require('express').Router();
const funcion = require('./controller');


userNetwork.post('/',funcion)

module.exports = userNetwork;