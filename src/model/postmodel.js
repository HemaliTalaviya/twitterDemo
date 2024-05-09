const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    postName:{
        type:String
    },
    like:{
        userId:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:'user'
        }],
        countLike:{
            type:Number,
            default:0
        }
    },
    Comment:[{
        commentUserId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        message:{
            type:String
        }
    }]
})

module.exports = mongoose.model('post',postSchema);