const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const routes = require('./routes/routes');

const app = express();
app.use(cors());


const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

app.use(routes);


const {addUser, removeUser, getUser, getUsersInRoom} = require('./users.js');


const io = socketio(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

io.on('connection', (socket) => {
    // console.log('a user connected');


    socket.on('join', (data, callback) => {
        const {name, room} = data;
        // console.log("name is", name,"and room is", room);

        const user = addUser({id: socket.id, name: name, room: room});
        // console.log("user data is ", user);
        if(user.error)
        {
            const error = user;
            return callback(error);
        }
        
        socket.emit('message', {user: 'admin', message: `Hello ${name}, Welcome to room ${room}`});

        socket.broadcast.to(room).emit('message', {user: 'admin', message: `${name} has joined the room`});
        
        socket.join(user.room);

        const users = getUsersInRoom(user.room);
        io.to(user.room).emit('userList', {userList: users});

        console.log(`${user.name} joined the room ${user.room}`);

        callback();
    })


    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        
        io.to(user.room).emit('message', {user: user.name, message: message});

        callback();
    })


    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        // console.log("removed was ", user);
        if(user)
        {
            console.log(`${user.name} left the room ${user.room}`);
            io.to(user.room).emit('message',{user:'admin', message: `${user.name} has left the room`});
            
            const users = getUsersInRoom(user.room);
            io.to(user.room).emit('userList', {userList: users});
        }
    });
});


server.listen(PORT, () => {
    console.log("app is running on port",PORT);
});