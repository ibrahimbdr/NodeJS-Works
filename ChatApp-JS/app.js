// Setup basic express server
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));
// Creating object to store users name
const users = {};

// Handiling Events and firing events between server and client
io.on('connection', (socket)=>{
    // Adding a user to the users object by listening to the socket new-user event
    console.log(socket.id);
    socket.on('new-user', (user)=>{
        users[socket.id] = user;
       
        // Firing event to inform other listeners about new user
        socket.broadcast.emit('user-connected', user);
    })
    
    // listening for comming messeges
    socket.on('send-chat-msg', (message)=>{
        // fire event to notify listeners about new message
        socket.broadcast.emit('chat-msg', {message: message, user: users[socket.id]});
        // Firing event to notify the user of his new message
        socket.emit('chat-msg-return', {message: message, user: users[socket.id]});
    });

    // listening to events when the user is disconnected
    socket.on('disconnect', ()=>{
        // Firing event to inform other listeners when the user is disconnected
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        // deleting the user from the array
        delete users[socket.id];
    });
})


