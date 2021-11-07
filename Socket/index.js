const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const app = express();
const cors = require('cors');

app.use(cors());

const PORT = process.env.PORT || 3002;
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origins: '*',
  },
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const io = require('socket.io')(3002, {
//   cors: {
//     origin: 'http://localhost:3000/',
//   },
// });

let users = [];

const addUser = (id, socketId) => {
  !users.some(user => user.id === id) && users.push({ id, socketId });
};

const removeUser = id => {
  users = users.filter(user => user.id !== id);
};

const getUser = receiverId => {
  console.log('log de receiverId', receiverId);
  return users.find(user => user.id === receiverId);
};

io.on('connection', socket => {
  console.log('a new user has connected');

  // io.emit("welcome", "hello there")

  socket.on('addUser', id => {
    addUser(id, socket.id);
    console.log('que carajo es este id ', id);
    console.log('usuarios = ', users);
    io.emit('getUsers', users);
  });

  socket.on('sendMessage', ({ senderId, receiverId, text }) => {
    console.log('ID', receiverId);
    const user = getUser(receiverId);
    console.log(user);
    if (user.socketId) {
      io.emit('getMessage', {
        senderId,
        text,
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});
