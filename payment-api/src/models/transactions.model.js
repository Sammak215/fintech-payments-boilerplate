const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionsSchema = new Schema(
  {
    object: {
      type: String,
      default: 'transaction',
    },
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    amount: String,
    balance_impact: {
      cash: String,
      inbound_pending: String,
      outbound_pending: String,
    },
    currency: String,
    description: String,
    financial_account: String,
    flow: String,
    flow_type: String,
    livemode: false,
    status: {
      type: String,
      default: 'open',
    },
    status_transitions: {
      posted_at: String,
      void_at: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('transactions', TransactionsSchema);
