"use strict";

require("dotenv").config();

// Keys for Stripe
const keySecret = process.env.SECRET_KEY;

// Stripe API
const stripe = require("stripe")(keySecret);

const { charges } = require("../US-API/payments");

exports.list_all_payments = function (req, res) {
  let param = {
    limit: req.query.limit || 10,
  };

  charges.list(param, function (err, charges) {
    // asynchronously called
    if (err) {
      console.log(err);
      res.send("REQUEST ERROR");
    } else {
      res.send(charges);
    }
  });
};

exports.create_a_payment = function (req, res) {
  console.log(req.body);
  let param = {
    user_id: req.body.user_id,
    amount: req.body.amount,
    currency: req.body.currency,
    customer: req.body.customer,
    source: req.body.source_id,
    description: req.body.description || "",
    receipt_email: req.body.receipt_email || "",
  };

  charges.create(param, function (err, charge) {
    // asynchronously called
    if (err) {
      console.log(err);
      res.send({ success: false });
    } else {
      res.send({ success: true });
    }
  });
};

exports.read_a_payment = function (req, res) {
  let paymentID = req.params.paymentId;

  charges.payment(paymentID, function (err, charge) {
    // asynchronously called
    if (err) {
      console.log(err);
      res("REQUEST ERROR");
    } else {
      res.send(charge);
    }
  });
};

exports.update_a_payment = function (req, res) {
  let paymentID = req.params.paymentId;
  let param = {
    description: req.body.description,
  };

  charges.update(paymentID, req.body, function (err, charge) {
    // asynchronously called
    if (err) {
      console.log(err);
      res("REQUEST ERROR");
    } else {
      res.json(charge);
    }
  });
};

exports.delete_payment = function (req, res) {
  let userID = req.params.paymentId;

  charges.delete(userID, function (err, confirmation) {
    // asynchronously called
    if (err) {
      console.log(err);
      res.send("REQUEST ERROR");
    } else {
      res.send(confirmation);
    }
  });
};
