const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rateSchema = new Schema({
    id: Schema.ObjectId,
    rate: Number,
    article: {type: Schema.ObjectId, ref:'Article'}
});

module.exports = mongoose.model('Rate',rateSchema);