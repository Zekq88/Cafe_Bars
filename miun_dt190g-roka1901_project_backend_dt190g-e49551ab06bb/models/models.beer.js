/*
    Schema för beer
*/

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var beerSchema = new Schema({
    name: String,
    type: String,
    information: String,
    grade: String

});

module.exports = mongoose.model("beer", beerSchema);