const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
const {  getBodyReq ,saltRounds } = require('../helpers/utils/utlis');
const { sendEmail } = require('../helpers/utils/mailer');
const uid = require('uid');
const Role = require('../models/roles.model');

const Authentication = (req,res) => {


    try {
        const { username: Username, password } = req.body ;


        User.findOne({
            username: Username
        }).exec((err,user)=>{
            console.log(user);
            if(err) {
                return res.status(500).json({err: err.message });
            }
            if(user){
                bcrypt.compare(password,user.password,function(err,isMatch){
                    if(err) { return res.status(500).json({err: err.message }); }
                    console.log(isMatch);
                    if(isMatch){
                        const tokenObj = {};
                        tokenObj.username = user.username;
                        tokenObj.userId = user._id;
                        tokenObj.role = user.role;
                        const token = jsonWebToken.sign(tokenObj,process.env.JWT)
                        return res.status(200).json({ res:'loged-in',token: token });
                    }else{
                        return res.status(500).json({err: 'wrong password !' });
                    }
                });
            }else{
                return res.status(500).json({err: 'user not found !' });
            }
        });
    }catch (e) {
        return res.status(500).json({err: e.message });
    }


};

const Signup = async (req,res) => {
    try {
        const arr = ['username','password','email','name','surname','birth'];
        const { body } = req;
        const requestObj = getBodyReq(body,arr);
        const role =  await Role.findOne({ role: 'user'}).exec();
        bcrypt.genSalt(saltRounds,function(err,salt){
            if (err) return next(err);
            bcrypt.hash(uid(15), salt, function(err,hash){
                if(err) return next(err);
                requestObj.token = hash;
                requestObj.role = role._id ;
                const createUser = new User(requestObj);
                createUser.save( async (err,user)=>{
                    if(err) return res.status(500).json(err.message);
                    await sendEmail(user.email,'forum activation email',`dear ${user.name} , in order to activate your account use the following Token ${hash}`);
                    return res.status(200).json({message:`Account has been created 
                we have sent you a confirmation email to the adress: ${user.email}
               `});
                });
            });

        });
    }catch (e) {
        res.status(500).json(err.message);
    }
};

const Confirmation = (req,res) => {
    try {
        const { token } = req.params;
        User.findOne({ token:token })
            .exec((err,user)=>{
                if (err) {return res.status(501).json({err:err.message}); }
                if ( user ) {
                    user.state = true;
                    user.save((err)=>{
                        if(err) return res.status(501).json({err:err.message});
                        return res.status(200).json({message:`account has been confirmed. `});
                    })
                }
            });
    }catch (e) {
         res.status(501).json({err:err.message});
    }

};


module.exports = {
    Authentication,
    Signup,
    Confirmation
}