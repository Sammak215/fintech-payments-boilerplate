const { BankModel } = require('../../models');

const bank = {
  list: async (data, handler) => {
    const response = await BankModel.find({});

    console.log(response, 'response');

    if (response) {
      handler(false, response);
    } else {
      handler(true, '');
    }
  },
};

module.exports = {
  bank,
};
