const io = require('socket.io')(8000, {
    cors: {
        origin: '*',
    }
})
const users = {};
io.on('connection', socket => {
    socket.on('new-user-joined', nme => {
        console.log('new user', nme);
        users[socket.id] = nme;
        socket.broadcast.emit('user-joined', nme);
    })

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, nme: users[socket.id] })
    })
})