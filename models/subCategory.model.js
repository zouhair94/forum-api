const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubCatSchema = new Schema({
    id: Schema.ObjectId,s
    SubCategory: {type: String , required:true },
    description: String,
    Category: {type: Schema.ObjectId , ref:'Category'}
});

module.exports = mongoose.model('SubCat',SubCatSchema);