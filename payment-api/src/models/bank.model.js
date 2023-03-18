const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BankSchema = new Schema(
  {
    name: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model('Banks', BankSchema);
