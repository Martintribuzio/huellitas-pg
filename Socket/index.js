const io = require('socket.io')(
    3002,{
        cors:{
            origin:'http://localhost:3000'
        }
    }
);
let users = [];

const addUser = (id,socketId) => {
    if(!users.some(user => user.id === id)){
        users.push({id,socketId});
    }
}
const removeUser = (id) => {
    users = users.filter(user => user.id === id);
}
const getUser = (receiverId) => {
    return users.find((user) => user.id === receiverId);
  };

io.on('connection',(socket)=>{
    console.log("a new user has connected");
    
    // io.emit("welcome", "hello there")

    socket.on('addUser',(userId)=>{
        addUser(userId,socket.id);
        io.emit('getUsers',users);
    })

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
        });
      });
    
    
    socket.on('disconnect',()=>{
        console.log('user disconnected');
        removeUser(socket.id);
        io.emit('getUsers',users);
    });
});