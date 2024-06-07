/*
    Schema för grade
*/

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var gradeSchema = new Schema({
    0: String,
    1: String,
    2: String,
    3: String,
    4: String

});

module.exports = mongoose.model("grade", gradeSchema);