const EVENT_NAME = require("../constant/eventName");
const postController = require("../queryManagement/postController");
const { sendToSocketEmitter } = require("../eventEmitter");



const postList = async(data,socket) =>{
    try {
        // console.log(`post List function ${JSON.stringify(data)} socket Id===${socket.id}`);

        let postData = await postController.find();

        if(!postData){
            data = {
                eventName:EVENT_NAME.POST_LIST,
                data:{message:'post is not found'}
            }
            return sendToSocketEmitter(socket.id,data)
        }
        
        let userData = [];
        postData.forEach(element => {
            userData.push(element.userId)
        });

        data = {
            eventName:EVENT_NAME.POST_LIST,
            data:{postData,userData}
        }
        return sendToSocketEmitter(socket.id,data)

    } catch (error) {
        console.log('postList Event Error::',error.message);
    }
}

module.exports = postList;