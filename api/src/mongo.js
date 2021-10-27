const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connected');
  })
  .catch(err => console.log(err));

// const tuki = new Nota({
//     content:"fiesta",
//     number: 5
// })
// tuki.save().then(res => {
//     console.log(res);
//     mongoose.connection.close()
// })
// .catch(err => console.log(err));
