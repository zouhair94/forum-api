const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    id: Schema.ObjectId,
    title: {type: String, required: true},
    content: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()},
    author: {type: Schema.ObjectId, ref: 'User'},
    comments: [{type: Schema.ObjectId, ref: 'Comment'}]
});

module.exports = mongoose.model('Article',ArticleSchema);