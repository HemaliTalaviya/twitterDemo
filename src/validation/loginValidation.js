
const Joi = require('joi');


    const signUpValidation = async(req,res,next) =>{
        try {
            const schema = Joi.object().keys({
                name : Joi.string().required(),
                email : Joi.string().email({
                    minDomainSegments:2,
                    tlds:{allow:["com","in"]}
                }),
                password : Joi.string().required()
            })

            const {error} = schema.validate(req.body,{abortEarly:false})
            if(error){
                const {details} = error
                res.status(500).json({error:details})
            }else{
                next();
            }
        } catch (error) {
            console.log('signUpValidation Error:::',error.message);
        }
    }

    const loginValidation = async(req,res,next) => {
        try {
            const schema = Joi.object().keys({
                email : Joi.string().email({
                    minDomainSegments:2,
                   tlds :{allow:["com","in"]}
                }),
                password : Joi.string().required()
            })

            const {error} = schema.validate(req.body,{abortEarly:false})
            if(error) {
                const {details} = error
                res.status(500).json({error:details})
            }else{
                next();
            }
     }catch(err) {
        console.log('loginValidation Error:::',err.message);
    }
}

module.exports = {signUpValidation,loginValidation};

