const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BalanceSchema = new Schema(
  {
    object: {
      type: String,
      default: 'balance',
    },

    available: [
      {
        amount: {
          type: String,
          default: '0',
        },
        currency: {
          type: String,
          default: 'gbp',
        },
        source_types: {
          card: String,
        },
      },
    ],

    livemode: {
      type: Boolean,
      default: false,
    },

    pending: [
      {
        amount: String,
        currency: {
          type: String,
          default: 'gbp',
        },
        source_types: {
          card: String,
        },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Balance', BalanceSchema);
