const eventHandler = require("../eventHandler");

const socketConnection = () =>{
    try {
        io.on('connection', async(socket) =>{
            console.log('conncted...',socket.id)
            // console.log('testing.......')
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