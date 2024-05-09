
const postController = require('../queryManagement/postController')
const mongoose = require('mongoose');
const { sendToAllSocketEmitter } = require('../eventEmitter');
const EVENT_NAME = require('../constant/eventName');
const addPost = async (data, socket) => {
    try {
        // console.log(`add post function =${JSON.stringify(data)} socketId===${socket.id}`);
      
        const userData = data.data.userName
        data = {
            userId: data.data.userId,
            postName: data.data.inputValue
        }

        let postData = await postController.create(data);
        // console.log('post Data log ====', postData);

        if(!postData){
            data = {
                eventName: EVENT_NAME.ADD_POST,
                data: {message:'post is not create' }
            }
        return sendToAllSocketEmitter(data)
        }
        
        if(!userData){
            data = {
                eventName: EVENT_NAME.ADD_POST,
                data: {message:'userData not found' }
            }
        return sendToAllSocketEmitter(data)
        }
        
        data = {
            eventName: EVENT_NAME.ADD_POST,
            data: { postData ,userData }
        }
        return sendToAllSocketEmitter(data)


    } catch (error) {
        console.log('addpost Event Error::', error.message);
    }
}

module.exports = addPost;