const { Users, BalanceModel } = require("../../models");

const jwt = require("jsonwebtoken");
const jwt_secret = "lkmklml4k2mm32lmmdlsdmwemmefmweef";
const tokenOptions = {
  expiresIn: "30d",
};

const customer = {
  create: async (data, handler) => {
    const balanceCreate = await BalanceModel.create({
      available: [],
      pending: [],
    });

    const response = await Users.create({
      balance: balanceCreate.id,
      ...data,
    });

    if (response) {
      handler(false, response.id);
    } else {
      handler(true, "Failed to create user");
    }
  },
  list: async (error, handler) => {
    const response = await Users.find();
    if (response) {
      handler(false, response);
    } else {
      handler(true, "Error getting users");
    }
  },
  update: async (id, data, handler) => {
    let response = await Users.findOneAndUpdate({ _id: id }, data);
    if (response) {
      console.log(response);

      await response.save();

      handler(false);
    } else {
      handler(true, "Failed to create user");
    }
  },
  delete: async (id, handler) => {
    console.log(id);
    const response = await Users.findByIdAndDelete(id);

    if (response) {
      handler(false, "Deleted Successfully");
    } else {
      handler(true, false);
    }
  },
  retrieve: async (id, handler) => {
    const data = await Users.findOne({
      _id: id,
    }).lean();

    if (data) {
      console.log(data);
      handler(false, data);
    } else {
      handler(true, {});
    }
    // async function data_func(data) {
    //   const apptoken = jwt.sign(
    //     {
    //       id: data._id,
    //       uid: data.uid,
    //       email: data.email,
    //     },
    //     jwt_secret,
    //     tokenOptions,
    //   );

    //   let payload = {
    //     success: true,
    //     data: {
    //       ...data,
    //       apptoken: apptoken,
    //     },
    //     message: '',
    //   };

    //   return payload;
    // }
  },
  tokenize: async (authorizationHeaader, handler) => {
    if (authorizationHeaader) {
      const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
      try {
        // verify makes sure that the token hasn't expired and has been issued by us
        jwt.verify(token, jwt_secret, tokenOptions, function (err, result) {
          if (err) {
            console.log(err);
            console.log("Token Invalid");

            res.send({
              success: false,
            });
          } else {
            console.log("Token Valid");
            // Let's pass back the decoded token to the request object
            req.user = result;

            handler(false, "Tokenized Successfully");

            // We call next to pass execution to the subsequent middleware
            next();
          }
        });
      } catch (err) {
        // Throw an error just in case anything goes wrong with verification
        throw new Error(err);
        handler(true, false);
      }
    } else {
      console.log("no authorization headers");
      result = {
        error: `Authentication error. Token required.`,
        status: 401,
      };
      res.status(401).send(result);
    }
  },
};

module.exports = {
  customer,
};
