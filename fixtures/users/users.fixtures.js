const User = require('../../models/user.model');

const createAdmin  = ()=>{
        const admin = new User({
            name: 'jhon',
            surname: 'Doe',
            username: 'admin',
            password: 'admin1234', // the password is automaticly hashed via a hook pre save
            birth: '02.02.1994',
            state: true
        });
        admin.save((err,user)=>{
            if(err) console.log(err);
            else console.log(`the user ${user.username} has been successfully added !`);
        });
};

module.exports = {
    createAdmin
};