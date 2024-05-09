const EVENT_NAME = require("../constant/eventName");
const postController = require("../queryManagement/postController");
const { sendToSocketEmitter } = require("../eventEmitter");



const commentList = async(data,socket) =>{

    console.log(`comment List function ${JSON.stringify(data)} socket Id ==${socket.id}`);
    try {
        
        let commentData= await postController.findData({_id:data.data.postId});
        // console.log('allPost data comment ==',JSON.stringify(commentData));

        if(!commentData){
            data = {
                eventName:EVENT_NAME.COMMENT_LIST,
                data:{message:'post is not found'}
            }
            return sendToSocketEmitter(socket.id,data)
        }
        

        data = {
            eventName:EVENT_NAME.COMMENT_LIST,
            data:{commentData}
        }
        return sendToSocketEmitter(socket.id,data)

    } catch (error) {
        console.log('comment List Event Error::: ==',error.message);
    }
}

module.exports = commentList;