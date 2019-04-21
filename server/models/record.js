const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** record Schema prototype declaration  */
var recordSchema = new Schema({
  key: String,
  value: String,
  createdAt: Date,
  counts: [Number]
});

var Record = mongoose.model("record", recordSchema);

module.exports = Record;