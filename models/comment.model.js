const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    id: Schema.ObjectId,
    comment: String,
    createdAt: {type: Date, default: Date.now()},
    from: {type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Comment',commentSchema);