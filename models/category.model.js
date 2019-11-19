const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriSchema = new Schema({
    id: Schema.ObjectId,
    category: {type: String , required:true },
    description: String,
    subCategories: [{type: Schema.ObjectId , ref:'SubCat'}]
});

module.exports = mongoose.model('Category',CategoriSchema);