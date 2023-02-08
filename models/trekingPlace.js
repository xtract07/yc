const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrekSchema = new Schema({
    placeName : String,
    averageRating : Number,
    description : String,
    location : String
});

module.exports = mongoose.model('Trek',TrekSchema);