const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
const {  getBodyReq ,saltRounds } = require('../helpers/utils/utlis');
const { sendEmail } = require('../helpers/utils/mailer');
const uid = require('uid');
const Role = require('../models/roles.model');
const crypto = require('crypto');

//authentication Controller
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

//Sign up Controller
const Signup = async (req,res) => {
    try {
        const arr = ['username','password','email','name','surname','birth'];
        const { body } = req;
        const requestObj = getBodyReq(body,arr);
        const role =  await Role.findOne({ role: 'user'}).exec();
        requestObj.token = crypto.randomBytes(32).toString('hex');
        requestObj.role = role._id ;
        requestObj.code = uid(8);
        const createUser = new User(requestObj);
        createUser.save( async (err,user)=>{
            if(err) return res.status(500).json(err.message);
            await sendEmail(user.email,'forum activation email',`dear ${user.name} , in order to activate your account use the following Token ${user.token}`);
            return res.status(200).json({message:`Account has been created 
                we have sent you a confirmation email to the adress : ${user.email}.`});
        });
    }catch (e) {
        res.status(500).json(e.message);
    }
};

//Confirmation controller using token and activation code
const Confirmation = (req,res) => {
    try {
        const { token } = req.params;
        const { code } = req.body;
        User.findOne({ token:token })
            .exec((err,user)=>{
                if (err) {return res.status(501).json({err:err.message}); }
                if ( user !== undefined && user.code === code ) {
                    user.state = true;
                    user.token = '' ;
                    user.code = '' ;
                    user.save((err)=>{
                        if(err) return res.status(501).json({err:err.message});
                        return res.status(200).json({message:`account has been confirmed. `});
                    })
                }
            });
    }catch (e) {
         res.status(501).json({err: e.message });
    }

};

//Reset password token generation
const resetPassword = (req,res) => {
    try {
        const { email } = req.body;
        User.findOne({email})
            .exec((err,user) => {
                if(err) return res.status(501).json({err: err.message});
                if(user){
                    user.token = crypto.randomBytes(32).toString('hex'); // create a token
                    user.code = uid(8);
                    user.save((err,result) =>{
                        if(err) return res.status(401).json({err:err.message});
                        sendEmail(email,'change password request',`in order to change your password use the code ${user.token}`);
                        return res.status(200).json({message:`we have sent an email to the following adress ${user.email}.`});
                    });
                }
            });
    }catch (e) {
        res.status(500).json({err: e.message});
    }

};


//email change password confirmation
const checkReset = (req, res) => {
    try {
        const { token } = req.params;
        const { code } = req.body;
        User.findOne({
            token
        }).exec((err,user) => {
            if(err) return res.status(500).json({err: err.message});
            if(user !== undefined && user.code ===code ){
                user.changeState = true;
                return res.status(200).json({message:'forward to change password page'});
            }
        });
    }catch (e) {
        res.status(500).json({err: e.message});
    }

};
//reset password
const Reset = (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        User.findOne({token})
            .exec((err,user) => {
                if(err) return res.status(401).json({err: err.message});
                if( user !== undefined && user.changeState && password !== null ){
                    user.password = password;
                    user.save((err) => {
                        if(err) return res.status(500).json({err: err.message});
                        res.status(200).json({message:'password changed'});
                    });
                }
            });
    }catch (e) {
        res.status(500).json({err: e.message});
    }
};

module.exports = {
    Authentication,
    Signup,
    Confirmation,
    resetPassword,
    checkReset,
    Reset
};