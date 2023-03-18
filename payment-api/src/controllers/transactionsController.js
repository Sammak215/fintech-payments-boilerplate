require('dotenv').config();

// Keys for Stripe
const keySecret = process.env.SECRET_KEY;

// Stripe API
const stripe = require('stripe')(keySecret);

const { Transactions } = require('../US-API/transactions');

exports.create_transaction = function (req, res) {
  Transactions.create(param, function (err, transaction) {
    // asynchronously called
    if (err) {
      res.json({
        error: 'REQUEST ERROR',
      });
    } else {
      res.json(transaction);
    }
  });
};

exports.get_transaction = function (req, res) {
  let paymentID = req.params.paymentId;

  Transactions.list(paymentID, function (err, charge) {
    // asynchronously called
    if (err) {
      console.log(err);
      res('REQUEST ERROR');
    } else {
      res.send(charge);
    }
  });
};
