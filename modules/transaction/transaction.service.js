const db = require("../../database/db");

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
      const userBalance = await db.transaction.groupby({
        by: ["user_id"],
        where: {
          user_id: userId,
        },
        _sum: {
          amount: true,
        },
      });
      return userBalance;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = transactionService;
