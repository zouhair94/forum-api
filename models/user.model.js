
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { saltRounds } = require('../helpers/utils/utlis');


const userSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: { type: String , required: true },
    surname: { type: String, required: true},
    username: { type: String, required: true , unique: true},
    email: { type: String, required: true , match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, unique:true  },
    password: { type: String , required: true },
    birth: { type: String, required: true },
    state: { type: Boolean , default: false },
    role: { type: Schema.ObjectId , ref:'Role' },
    token: {type: String, unique: true },
    createdAt: { type: Date , default: Date.now() },
    updatedAt: Date
});

//auto hash the password
userSchema.pre('save', function(next){
    let user = this;
    if(!user.isModified('password')) return next();
    //generating salt for bcrypt
    bcrypt.genSalt(saltRounds,function(err,salt){
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err,hash){
            if(err) return next(err);
            user.password = hash;
            next();
        });

    });
});

module.exports = mongoose.model('User',userSchema);