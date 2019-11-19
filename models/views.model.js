const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const viewSchema = new Schema({
    id: Schema.ObjectId,
    view: Number,
    article: {type: Schema.ObjectId, ref:'Article'}
});

module.exports = mongoose.model('View',viewSchema);