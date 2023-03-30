const db = require("../../database");

const transactionService = {
  create: async (obj) => {
    try {
      const transaction = await db.transaction.create({
        data: obj,
      });
      return transaction.id;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  delete: async (id) => {
    try {
      return await db.transaction.delete({
        where: {
          id: parseInt(id),
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getTransactionByUserId: async (userId) => {
    try {
      return await db.transaction.findMany({
        where: {
          user_id: userId,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getWalletBallance: async (userId) => {
    try {
      const userBalance = await db.transaction.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          user_id: userId,
        },
      });
      return userBalance;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = transactionService;
