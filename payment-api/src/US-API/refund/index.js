const { RefundModel } = require('../../models');

const Refund = {
  create: async (data, handler) => {
    const response = await RefundModel.create(data);
    if (response) {
      handler(false, 'Payment Successful');
    } else {
      handler(true, 'Failed to create user');
    }
  },
  list: async (data, handler) => {
    const response = await RefundModel.find();
    if (response) {
      handler(false, response);
    } else {
      handler(true, 'Error getting RefundModel');
    }
  },
  payment: async (data, handler) => {
    console.log(data);
    const response = await RefundModel.findById(data);
    if (response) {
      handler(false, response);
    } else {
      handler(true, 'Error getting RefundModel');
    }
  },
  update: async (id, data, handler) => {
    let response = await RefundModel.findOneAndUpdate({ _id: id }, data);
    if (response) {
      //   response = data;
      console.log(response);

      //   await response.save();
      handler(false);
    } else {
      handler(true, 'Failed to create user');
    }
  },
  delete: async (id, handler) => {
    console.log('id', id);
    const response = await RefundModel.findByIdAndDelete(id);
    console.log(response);

    if (response) {
      handler(false, 'Deleted Successfully');
    } else {
      handler(true, false);
    }
  },
};

module.exports = {
  Refund,
};
