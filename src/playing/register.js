
const userController = require('../queryManagement/usercontroller');
const register =  async(req,res) => {
    try {
       
        let data = req.body
        if (data.name && data.email && data.password) {
           let userData =  await userController.create(data);
           if (!userData) {
            res.send({success:false,message:'data not found',data:{}})
        }else{
            res.send({success:true,message:'Ok',data:{userData}})
        }
        } else {
            res.send({success:false,message:'please enter valid data',data:{}})
        }

    } catch (error) {
        console.log('register event Error :', error.message);
    }
}

module.exports = register