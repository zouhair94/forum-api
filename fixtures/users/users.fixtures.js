const User = require('../../models/user.model');
const Role = require('../../models/roles.model');

const createAdmin  = ()=>{
        return new Promise( async (resolve, reject) => {
            const role =  await Role.findOne({role:'admin'}).exec();
            console.log(role);
            const admin = new User({
                name: 'jhon',
                surname: 'Doe',
                email: 'email@yopmail.com',
                username: 'admin',
                password: 'admin1234', // the password is automaticly hashed via a hook pre save
                birth: '02.02.1994',
                role: role._id,
                state: true
            });
            admin.save((err,user)=>{
                if(err) console.log(err);
                else console.log(`the user ${user.username} has been successfully added !`);
            });
        });

};

module.exports = {
    createAdmin
};