const EVENT_NAME = require("../constant/eventName");

const sendToSocketEmitter = (socketId,data) =>{
    try {
        // console.log(`sendToSocketEmitter socketId = ${socketId} data ===${JSON.stringify(data)}`);

        io.to(socketId).emit(data.eventName,data)

    } catch (error) {
        console.log('sendToSocketEmitter Error :',error.message);
    }
}



const sendToAllSocketEmitter = (data) => {
    try {
        // console.log(`sendToAllSocketEmitter  data === ${JSON.stringify(data)}`);
        io.emit(data.eventName,data);

    } catch (error) {
        console.log('sendToAllSocketEmitter Error:',error.message)
    }
}


module.exports ={ sendToSocketEmitter,sendToAllSocketEmitter};