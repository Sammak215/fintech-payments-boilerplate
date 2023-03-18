const { TransactionsModel } = require('../../models');

const Transactions = {
  create: async (data, handler) => {
    const response = await TransactionsModel.create(data);

    if (response) {
      handler(false, response);
    } else {
      handler(true, 'Failed Transactions');
    }
  },
  list: async (id, handler) => {
    const response = await TransactionsModel.find({
      user: id,
    });

    if (response) {
      handler(false, response);
    } else {
      handler(true, 'Error getting transactions');
    }
  },
};

module.exports = {
  Transactions,
};
