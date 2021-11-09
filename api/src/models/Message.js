const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    content: {
      type:String
    },
    Converseid: {
      type:String
    },
    sender: {
      type:String
    },
    state:{
      type:String,
      enun:['read','unread'],
      default:'unread'
    }
},
  {timestamps:true}
);
  
const message = new model('Message', messageSchema);
  
module.exports = { message };
  