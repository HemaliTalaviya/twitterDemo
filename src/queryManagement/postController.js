const postModel = require('../model/postmodel');

module.exports = {


    create: async (data) => {

        try {
            let postData = await postModel.create(data);
            return postData;

        } catch (error) {
            console.log('create Post Error ::', error.message);
        }
    },
    findById: async (data) => {
        try {
            // console.log('findBy Id data===', data);
            let postFindById = await postModel.findById(data).populate('Comment.commentUserId');
            return postFindById;

        } catch (error) {
            console.log('findById Data ::', error.message);
        }
    },
    updateOne: async (data) => {

        try {
            let updateData = await postModel.findByIdAndUpdate(data.condition, data.updateData, { new: true });
            return updateData

        } catch (error) {
            console.log('update One Error::', error.message);
        }
    },
    find: async () => {
        try {
            let postData = await postModel.find().populate('userId');
            return postData;

        } catch (error) {
            console.log('find All  Error::', error.message);

        }
    },
    findData: async (condition) => {
        try {
            let postData = await postModel.find(condition).populate('userId').populate('Comment.commentUserId');
            return postData;

        } catch (error) {
            console.log('find All  Error::', error.message);

        }
    }

}