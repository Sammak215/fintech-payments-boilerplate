const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema(
  {
    _id: String,
    name: String,
    email: String,
    balance: { type: Schema.Types.ObjectId, ref: 'Balance' },

    banks: [
      {
        bankID: { type: Schema.Types.ObjectId, ref: 'Bank' },
        name: String,
        Currency: {
          type: String,
          default: 'GBP',
        },
        ammount: {
          type: String,
          ammount: '10000',
        },
        accountNumber: String,
      },
    ],
  },
  { timestamps: true, _id: false },
);

module.exports = mongoose.model('users', UsersSchema);
