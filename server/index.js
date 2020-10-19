const express = require('express');
const socketio =  require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io =  socketio(server);
const router = require('./router');
const { addUser , removeUser , getUser , getUserInRoom } = require("./users");

const PORT = process.env.PORT || 5000;

app.use(router);

io.on('connection',(socket) => {
    console.log("we have a connection");
    socket.on('join',({name,room},callback) => {
         const { error , user } = addUser({ id:socket.id ,name , room});
         if(error) return callback(error);
         socket.join(user.room);
         socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });
         socket.broadcast.to(user.room).emit('message',{user: 'admin', text: `${user.name}, has joined!`});
         callback();
    });

    socket.on('sendMessage',(message,callback)=>{
        //01:08:03 stops
    })

    socket.on('disconnect',()=>{
        console.log("user left");
    })
})
server.listen(PORT , ()=> console.log(`Server started on ${PORT}` ));
