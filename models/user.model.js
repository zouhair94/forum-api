
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const saltRounds = 10;

const userSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: { type: String , required: true },
    surname: { type: String, required: true},
    username: { type: String, required:true },
    password: { type: String , required: true },
    birth: { type: String, required: true },
    state: { type: Boolean , default: false },
    role: { type: Schema.ObjectId , ref:'Role' },
    token: String,
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