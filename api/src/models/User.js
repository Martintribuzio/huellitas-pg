const {Schema,model} = require('mongoose');

const userSchema = new Schema({
    name:String,
    email:String,
    password:String,
    postalCode:Number,
    posts:[{type:Schema.Types.ObjectId,ref:'Post'}]
})

const User = new model('User',userSchema);

module.exports = {User}