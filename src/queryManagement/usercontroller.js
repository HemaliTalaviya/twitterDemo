const { findById } = require('../model/postmodel');
const user = require('../model/usermodel');
// const signUpValidation = require('../validation/loginValidation');


module.exports = {


    create: async (data) => {

        try {
            const userData = await user.create(data);
            return userData;

        } catch (error) {
            console.log('Error:', error.message);
        }
    },

    findOneUser: async (data) => {
        try {
            const existingUser = await user.findOne(data.condition)
            return existingUser;

        } catch (error) {
            console.log('findOneUser Event Error:', error.message);
        }
    }
}

