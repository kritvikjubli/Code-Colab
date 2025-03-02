const express =require('express');
const http = require('http');
const {Server}=require('socket.io');
const Actions = require('./src/Actions.jsx');

const app=express();

const server=http.createServer(app);
const io=new Server(server);

const userSocketMap={};

function getallConnectedClients(roomId){
   return Array.from(io.sockets.adapter.rooms.get(roomId)|| []).map((socketId)=>{
    return{
        socketId,
        username:userSocketMap[socketId],
    }
   })
}

io.on('connection',(socket)=>{
    console.log(socket.id);

    socket.on(Actions.JOIN,({roomId,username})=>{
        console.log(username);
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients=getallConnectedClients(roomId);
        clients.forEach(({socketId})=>{
            io.to(socketId).emit(Actions.JOINED,{
                clients,
                username,
                socketId:socket.id,
            })
        })
    })
})


const PORT=process.env.PORT || 5000;
server.listen(PORT,()=>{console.log('listening on port '+PORT);});