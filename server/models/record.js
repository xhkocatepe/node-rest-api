const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** record Schema prototype decleration  */
var recordSchema = new Schema({
  key: String,
  value: String,
  createdAt: Date,
  counts: [Number]
});

var Record = mongoose.model("record", recordSchema);
 
module.exports = Record;