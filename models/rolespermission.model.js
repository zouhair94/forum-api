const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const rolesPemissionSchema = new Schmea({
    id: Schema.ObjectId,
    item: String,
    roles:[ { type: Schema.ObjectID , ref:'Role' }],
    permissions: [ { type: Schema.ObjectID , ref:'Permission' }]
});

module.exports = mongoose.model('rolePermission',rolesPemissionSchema);