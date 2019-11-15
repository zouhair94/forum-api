const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const permissionSchema = new Schema({
    id: Schema.ObjectId,
    permission: String
});

module.exports = mongoose.model('Permission',permissionSchema);