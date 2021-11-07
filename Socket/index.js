const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

const PORT = process.env.PORT || 3002;
const server = http.createServer(app);

const io = socketio(server, {
  
  cors: {
    origin: process.env.FRONT_URL, // I copied the origin in the error message and pasted here
    methods: ['GET', 'POST'],
    credentials: true,
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
  return users.find(user => user.id === receiverId);
};

io.on('connection', socket => {
  console.log('a new user has connected');

  // io.emit("welcome", "hello there")

  socket.on('addUser', id => {
    addUser(id, socket.id);
  });

  socket.on('sendMessage', ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
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
  });
});
