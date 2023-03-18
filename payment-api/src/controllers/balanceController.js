"use strict";

require("dotenv").config();

// Keys for Stripe
const keySecret = process.env.SECRET_KEY;
// Stripe API
const stripe = require("stripe")(keySecret);

const { balance } = require("../US-API/balance");

exports.list_all_balances = function (req, res) {
  let param = {
    limit: req.query.limit || 10,
  };
  balance.list(param, function (err, transactions) {
    if (err) {
      console.log(err);
      res.send("REQUEST ERROR");
    } else {
      res.send(transactions);
    }
  });
};

exports.create = function (req, res) {
  balance.create(function (err, transactions) {
    if (err) {
      console.log(err);
      res("REQUEST ERROR");
    } else {
      res.json(transactions);
    }
  });
};

exports.update = function (req, res) {
  balance.update(function (err, transactions) {
    if (err) {
      console.log(err);
      res("REQUEST ERROR");
    } else {
      res.json(transactions);
    }
  });
};
