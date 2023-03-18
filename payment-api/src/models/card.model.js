const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema(
  {
    object: { type: String, default: 'card' },
    user_id: { type: Schema.Types.ObjectId, ref: 'user' },
    address_city: String,
    address_country: String,
    address_line1: String,
    address_line1_check: String,
    address_line2: String,
    address_state: String,
    address_zip: String,
    address_zip_check: String,
    brand: String,
    country: String,
    customer: String,
    cvc_check: String,
    dynamic_last4: Number,
    exp_month: Date,
    exp_year: Date,
    fingerprint: String,
    funding: String,
    last4: String,
    metadata: Object,
    name: String,
    redaction: String,
    tokenization_method: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model('Card', CardSchema);
