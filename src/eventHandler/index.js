const EVENT_NAME = require("../constant/eventName");
const addComment = require("../playing/addComment");
const addPost = require("../playing/addPost");
const commentList = require("../playing/commentList");
const likePost = require("../playing/likePost");
const login = require("../playing/login");
const postList = require("../playing/postList");
const register = require("../playing/register");

const eventHandler = (socket) =>{
    try {

        socket.onAny((eventName,data)=>{
            // console.log(`Event Name = ${eventName} data====${JSON.stringify(data)}`)

           switch(eventName){
            case EVENT_NAME.REGISTER:
            register(req,res);
            break;

            case EVENT_NAME.LOGIN:
            login(req,res);
            break;

            case EVENT_NAME.POST_LIST:
            postList(data,socket);
            break;

            case EVENT_NAME.ADD_POST:
            addPost(data,socket);
            break;

            case EVENT_NAME.LIKE_POST:
            likePost(data,socket);
            break;

            case EVENT_NAME.ADD_COMMENT:
            addComment(data,socket);
            break;

            case EVENT_NAME.COMMENT_LIST:
            commentList(data,socket);
            break;
           }

        })
        
    } catch (error) {
        console.log('eventHandler Error :',error.message);
    }
}


module.exports = eventHandler