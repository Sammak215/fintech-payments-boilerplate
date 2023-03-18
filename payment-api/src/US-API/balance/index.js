const { BalanceModel } = require("../../models");

const balance = {
  list: async (data, handler) => {
    const response = await BalanceModel.find();

    console.log(response, "response");

    if (response) {
      handler(false, response);
    } else {
      handler(true, "Error");
    }
  },
  user_balance: async (id, data, handler) => {
    let response = await BalanceModel.findById({ _id: id });
    if (response) {
      //   response = data;
      console.log(response);

      //   await response.save();
      handler(false);
    } else {
      handler(true, "Failed to create user");
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
  balance,
};
