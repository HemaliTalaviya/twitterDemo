
const EVENT_NAME = require('../constant/eventName');
const postModel = require('../model/postmodel')
const postController = require('../queryManagement/postController');
const { sendToSocketEmitter, sendToAllSocketEmitter } = require('../eventEmitter');
const likePost = async (data, socket) => {

    try {
        // console.log(`like post function =${JSON.stringify(data)} socketId===${socket.id}`);

        let postId = data.data.postId;
        let findPost = await postController.findById(data.data.postId);
        // console.log('find post ===', findPost);

        if (!findPost) {
            data = {
                eventName: EVENT_NAME.LIKE_POST,
                data: { message: 'Post Not Found' }
            }
            return sendToSocketEmitter(socket.id, data)
        }
        let addLike = "";
        let index = findPost.like.userId.indexOf(data.data.userId)
        if (index === -1) {
            addLike = await postController.updateOne(
                {
                    condition: { _id: postId },
                    updateData: {
                        $push: { 'like.userId': data.data.userId },
                        $inc: { 'like.countLike': 1 }
                    }
                }
            )


        } else {
            addLike = await postController.updateOne(
                {
                    condition: { _id: postId },
                    updateData: {
                        $pull: { 'like.userId': data.data.userId },
                        $inc: { 'like.countLike': -1 }
                    }
                },
                { new: true }

            );
        }

        data = {
            eventName: EVENT_NAME.LIKE_POST,
            data: { addLike }
        }
        return sendToAllSocketEmitter(data)


    } catch (error) {
        console.log('like post Event Error :', error.message);
    }
}

module.exports = likePost