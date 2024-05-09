const EVENT_NAME = require('../constant/eventName');
const userController = require('../queryManagement/usercontroller');
const { sendToSocketEmitter } = require('../eventEmitter');
const login = async (req, res) => {
    try {

        let data = req.body;

        const existingUser = await userController.findOneUser({ condition: { email: data.email } });

        if (!existingUser) {
            return res.send({ success: false, message: 'please register ', data: {} })
        }

        const passwordMatch = await data.password === existingUser.password;

        if (!passwordMatch) {
            return res.send({ success: false, message: 'Invalid Email Or Password', data: {} })
        }

        return res.send({ success: true, message: 'Ok', data: { existingUser } })


    } catch (error) {
        console.log('login Error:', error.message);
    }
}

module.exports = login;