require("dotenv").config();

// Keys for Stripe
const keySecret = process.env.SECRET_KEY;
// Stripe API
const stripe = require("stripe")(keySecret);

const { customer } = require("../US-API/users");

exports.list_all_users = function (req, res) {
  let param = {
    limit: req.query.limit || 10,
  };

  customer.list(param, function (err, customers) {
    // asynchronously called
    if (err) {
      console.log(err);
      res.send("REQUEST ERROR");
    } else {
      res.send(customers);
    }
  });
};

exports.create_a_user = function (req, res) {
  const { id, email, first_name, last_name } = req.body;

  let param = {
    _id: id,
    email: email,
    name: `${first_name} ${last_name}`,
    // metadata: metadata,
  };

  try {
    customer.create(param, function (err, customers) {
      // asynchronously called
      if (err) {
        console.log(err);
        res("REQUEST ERROR");
      } else {
        res.json({
          id: customers.id,
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
};

exports.read_a_user = function (req, res) {
  let userID = req.params.userId;
  customer.retrieve(userID, function (err, customer) {
    // asynchronously called
    if (err) {
      res.json({
        error: err,
      });
    } else {
      console.log("cus", customer);
      res.json(customer);
    }
  });
};

exports.update_a_user = function (req, res) {
  const userID = req.params.userId;

  const param = {
    banks: [req.body.banks],
  };

  customer.update(userID, param, function (err) {
    // asynchronously called

    if (err) {
      res.json({
        data: "REQUEST ERROR",
      });
    } else {
      res.json({
        data: "Updated Successfully",
      });
    }
  });
};

exports.delete_a_user = function (req, res) {
  let userID = req.params.userId;

  customer.delete(userID, function (err, confirmation) {
    // asynchronously called
    if (err) {
      console.log(err);
      res("REQUEST ERROR");
    } else {
      res.send(confirmation);
    }
  });
};

exports.check_tokenize = function (req, res) {
  const authorizationHeaader = req.headers.authorization;

  customer.tokenize(authorizationHeaader, function (err, confirmation) {
    // asynchronously called
    if (err) {
      console.log(err);
      res("REQUEST ERROR");
    } else {
      res.send(confirmation);
    }
  });
};
