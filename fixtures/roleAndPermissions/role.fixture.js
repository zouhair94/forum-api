const Role = require('../../models/roles.model');

//add one role
const addRole =  (item) =>{
    return new Promise((resolve, reject) =>{
        const role = new Role({
            role: item ,
        });
        role.save((err,res)=>{
            if(err) reject(err);
            resolve(`the Role  ${res} has been added !`);
        });
    });

};

const addRoles = async (items) => {
    const roles = [];
    for(let item of items){
        roles.push(addRole(item));
    }
    await Promise.all(roles)
        .then(res=>console.log(res))
        .catch(err=>console.log(err));
};

module.exports = addRoles;