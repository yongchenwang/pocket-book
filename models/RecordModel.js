let mongoose = require('mongoose');

let RecordSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true
  },

  time: Date,
  
  type: {
    type: Number,
    default: -1
  },

  amount: {
    type: Number,
    required: true
  },

    remark: String
});

let RecordModel = mongoose.model('records', RecordSchema);

module.exports = RecordModel;
