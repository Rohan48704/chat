const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
    cors: { origin: '*' }
});
let users = {};

const port = process.env.PORT || 3000;

io.on('connection', (client) => {
    console.log(client)
    client.on("join", (name) => {
        users[client.id] = name;
        client.emit("update", "you have connected to the server.");
        client.broadcast.emit("update", name + " has joined the server.");
        io.sockets.emit("update-people", users);
        console.log(users)
    });

    client.on("send", (msg) => {
        io.sockets.emit("chat", users[client.id], msg, new Date());
    });

    client.on("disconnect", () => {
        io.sockets.emit("update", users[client.id] + "has left the server.");
        delete users[client.id];
        console.log(users)
        io.sockets.emit("update-people", users);

    });
});

httpServer.listen(port, ()=> console.log(`listening on port ${port}`));