const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    id: Schema.ObjectId,
    role: String
});

module.exports = mongoose.model('Role',roleSchema);