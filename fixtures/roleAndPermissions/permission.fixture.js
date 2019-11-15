const Permission = require('../../models/permissions.model');

const addPermission = (perm) =>{
    return new Promise((resolve, reject)=>{
        const permission = new Permission({
            permission: perm
        });
        permission.save((err,item)=>{
            if(err) reject(err);
            else resolve(`the permission ${item} has been added ! `);
        });
    });

};

const addPermissions = async (values) => {
    const queryArr = [];
    for(let item of values){
         queryArr.push(addPermission(item));
    }
    await Promise.all(queryArr)
        .then(e=>console.log(e))
        .catch(err=>console.log(err));
};

module.exports = addPermissions ;