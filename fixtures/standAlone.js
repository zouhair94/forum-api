const dotenv = require('dotenv');

if(process.env.NODE_ENV === 'development'){
    dotenv.config({path:'./.env'});
}
console.log(process.env.DB);
const mongoose = require('../configs/db.config')();

const addPermissions = require('./roleAndPermissions/permission.fixture');
const Permission = require('../models/permissions.model');
const role = require('../models/roles.model');
const addRoles = require('./roleAndPermissions/role.fixture');

(async ()=>{
    try {

        const pemValues = ["READ","ADD","UPDATE","DELETE"];
        const roleValues = ['admin','moderator','user'];
        await addPermissions(pemValues);
        const permissionsLength = await Permission.countDocuments({}).exec();
        console.log(permissionsLength);
        if(permissionsLength === 4) await addRoles(roleValues);
        const rolesLength = await role.countDocuments({}).exec();
        console.log(rolesLength);



    }catch (e) {
        console.log(e);
    }
})();
