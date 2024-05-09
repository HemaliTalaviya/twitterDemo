const EVENT_NAME = require("../constant/eventName");
const postController = require("../queryManagement/postController");
const { sendToAllSocketEmitter } = require("../eventEmitter");


const addComment = async(data,socket) =>{
    try {
        console.log(`add comment function data ${JSON.stringify(data)}  socket ID==${socket.id}`);

        const postId = data.data.postId;
        console.log('post Id comment =',postId);


        let commentData = await postController.updateOne(
            {
                condition:{_id:postId},
                updateData:{
                    $push : {'Comment':{
                        $each :[{commentUserId :data.data.userId,message: data.data.commentText}]
                    } 
                    }
                }
            }
        );
        commentData = await postController.findById(postId);
        console.log('final comment data ==',commentData)

        data = {
            eventName : EVENT_NAME.ADD_COMMENT,
            data:{commentData:[commentData]}
        }

        return sendToAllSocketEmitter(data)


    } catch (error) {
        console.log('add Comment Event Error :::',error.message)
    }
}


module.exports = addComment;