const isValidCreditCardNumber = require('../functions/card-checker');

require('dotenv').config();

// Keys for Stripe
const keySecret = process.env.SECRET_KEY;
// Stripe API
const stripe = require('stripe')(keySecret);

const { Card } = require('../US-API/card');

exports.list_all_cards = function (req, res) {
  let user_id = req.query.userID;

  Card.list(user_id, function (err, cards) {
    // asynchronously called
    if (err) {
      console.log(err);
      res.json({ error: 'REQUEST ERROR' });
    } else {
      res.json(cards);
    }
  });
};

exports.create_a_card = function (req, res) {
  const validateCard = isValidCreditCardNumber(req.body.card_number.toString().trim());

  if (validateCard.status) {
    Card.create(
      {
        user_id: req.body.user_id,
        number: req.body.card_number.toString(),
        exp_month: parseInt(req.body.exp_month),
        exp_year: parseInt(req.body.exp_year),
        cvc: req.body.cvc,
        name: req.body.name || '',
        address_line1: req.body.address_line1 || '',
        address_line2: req.body.address_line2 || '',
        address_city: req.body.address_city || '',
        address_state: req.body.address_state || '',
        address_zip: req.body.address_zip || '',
        address_country: req.body.address_country || '',
        brand: req.body.brand,
      },
      function (err) {
        // asynchronously called
        if (err) {
          console.log(err);
          res('REQUEST ERROR.');
        } else {
          res.json({
            card: 'Created',
          });
        }
      },
    );
  } else {
    res.json({
      error: validateCard.error,
    });
  }
};

exports.read_a_card = function (req, res) {
  let userID = req.params.userId;
  let cardID = req.params.cardId;

  stripe.customers.retrieveCard(userID, cardID, function (err, card) {
    // asynchronously called
    if (err) {
      console.log(err);
      res('REQUEST ERROR');
    } else {
      res.json(card);
    }
  });
};

exports.update_a_card = function (req, res) {
  let userID = req.params.userId;
  let cardID = req.params.cardId;
  let param = {};

  Card,
    update(userID, cardID, param, function (err, card) {
      // asynchronously called
      if (err) {
        console.log(err);
        res('REQUEST ERROR');
      } else {
        res.json(card);
      }
    });
};

exports.delete_a_card = function (req, res) {
  let userID = req.params.userId;
  let cardID = req.params.cardId;

  Card.delete(userID, cardID, function (err, confirmation) {
    // asynchronously called
    if (err) {
      console.log(err);
      res('REQUEST ERROR');
    } else {
      res.json(confirmation);
    }
  });
};
