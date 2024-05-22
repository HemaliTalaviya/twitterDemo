const eventHandler = require("../eventHandler");
const createAdapter = require("@socket.io/redis-adapter");
const {  pubClient, subClient } = require('./redisConnection');
const socketConnection = () => {
   
    try {
        io.adapter(createAdapter(pubClient,subClient))
        io.on('connection', async(socket) =>{
            console.log('conncted...',socket.id)
            await eventHandler(socket);

            socket.on('disconnect',()=>{
                console.log('Disconnecting....');
            })
        })

    } catch (error) {
        console.log('socket Connection Error:::',error.message);
    }
}



module.exports = socketConnection