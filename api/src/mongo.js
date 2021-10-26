const mongoose = require('mongoose');
const {Nota} = require('./models/User')

mongoose.connect('mongodb+srv://Juan:test1234@testing.am01d.mongodb.net/MongoDb?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('conectados')
}).catch(err => console.log(err))


// const tuki = new Nota({
//     content:"fiesta",
//     number: 5
// })
// tuki.save().then(res => {
//     console.log(res);
//     mongoose.connection.close()
// })
// .catch(err => console.log(err));