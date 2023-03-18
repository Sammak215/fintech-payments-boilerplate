const { CardModel } = require('../../models');

const Card = {
  create: async (data, handler) => {
    const response = await CardModel.create(data);
    if (response) {
      handler(false, 'Payment Successful');
    } else {
      handler(true, 'Failed to create user');
    }
  },

  list: async (data, handler) => {
    const response = await CardModel.find({ user_id: data });

    if (response) {
      handler(false, response);
    } else {
      handler(true, 'Error getting CardModel');
    }
  },

  payment: async (data, handler) => {
    const response = await CardModel.findById(data);
    if (response) {
      handler(false, response);
    } else {
      handler(true, 'Error getting CardModel');
    }
  },
  update: async (id, data, handler) => {
    let response = await CardModel.findOneAndUpdate({ _id: id }, data);
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
    const response = await CardModel.findByIdAndDelete(id);
    console.log(response);

    if (response) {
      handler(false, 'Deleted Successfully');
    } else {
      handler(true, false);
    }
  },
};

module.exports = {
  Card,
};
