const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
mongoose.plugin(slug);
const Course = new Schema({
    // _id: ObjectId,
    name: String,
    description: String,
    date: Date,
    image: String,
    slug:{type:String, slug:"name",unique: true},
    videoId: String
});

module.exports = mongoose.model('Course', Course);
