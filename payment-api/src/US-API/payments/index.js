const { Payments, Users } = require("../../models");
const { BalanceModel } = require("../../models");
const { CardModel } = require("../../models");

const charges = {
  create: async (data, handler) => {
    data.paid = true;
    const response = await Payments.create(data);
    const customerBalance = await Users.findById(data.customer);
    const balances = await BalanceModel.findById(customerBalance.balance);
    // const available = balances.available[0].amount;

    console.log("response", balances);

    if (response) {
      // available.push({
      //   amount: data.amount,
      //   currency: "usd",
      //   source_types: {
      //     card: true,
      //   },
      // });
      if (balances.available.length === 0) {
        balances.available = [
          {
            amount: data.amount,
            currency: "usd",
            source_types: {
              card: true,
            },
          },
        ];
      } else {
        balances.available[0].amount =
          Number(balances.available[0].amount) + Number(data.amount);
        balances.available[0].currency = "usd";
      }

      // balances.available[0].amount = 0;

      await BalanceModel.findByIdAndUpdate(customerBalance.balance, {
        available: balances.available[0],
      });
      handler(false, "Payment Successful");
    } else {
      handler(true, "Failed to create user");
    }
  },
  list: async (data, handler) => {
    const response = await Payments.find();
    if (response) {
      handler(false, response);
    } else {
      handler(true, "Error getting Payments");
    }
  },
  payment: async (data, handler) => {
    console.log(data);
    const response = await Payments.findById(data);
    if (response) {
      handler(false, response);
    } else {
      handler(true, "Error getting Payments");
    }
  },
  update: async (id, data, handler) => {
    let response = await Payments.findOneAndUpdate({ _id: id }, data);
    if (response) {
      //   response = data;
      console.log(response);

      //   await response.save();
      handler(false);
    } else {
      handler(true, "Failed to create user");
    }
  },
  delete: async (id, handler) => {
    console.log("id", id);
    const response = await Payments.findByIdAndDelete(id);
    console.log(response);

    if (response) {
      handler(false, "Deleted Successfully");
    } else {
      handler(true, false);
    }
  },
};

module.exports = {
  charges,
};
