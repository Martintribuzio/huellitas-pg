const mongoose = require('mongoose')

mongoose
  .connect(
    'mongodb+srv://MozztDB:12345@huellitasserver.9yoac.mongodb.net/HuellitasDB?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('conectados')
  })
  .catch(err => console.log(err))

// const tuki = new Nota({
//     content:"fiesta",
//     number: 5
// })
// tuki.save().then(res => {
//     console.log(res);
//     mongoose.connection.close()
// })
// .catch(err => console.log(err));
