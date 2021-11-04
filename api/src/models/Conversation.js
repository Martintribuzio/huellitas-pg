const { Schema, model } = require('mongoose');

const conversationSchema = new Schema({
  members: {
    type: Array
  }    
},
  {timestamps:false}
);
  
const conversation = new model('Conversation', conversationSchema);
  
module.exports = { conversation };
  