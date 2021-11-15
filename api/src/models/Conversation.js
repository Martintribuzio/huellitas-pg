const { Schema, model } = require('mongoose');

const conversationSchema = new Schema({
  members: {
    type: Array
  },
  messages:[{ type: Schema.Types.ObjectId, ref: 'Message' }]
},
  {timestamps:true}
);
  
const conversation = new model('Conversation', conversationSchema);
  
module.exports = { conversation };
  