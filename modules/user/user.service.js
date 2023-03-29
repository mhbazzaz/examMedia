const db = require("../../db");
const { transactions } = require("../transaction");
const { orders } = require("../order");

const userService = {
  getUserByPhoneNumber: async (phone) => {
    try {
      return await db.user.findUnique({
        where: {
          phone,
        },
      });
    } catch (error) {
      throw new Error(error.message);

    }
  },
  getUserById: async (id) => {
    try {
      return await db.user.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error(error.message);

    }
  },

  getAll: async () => {
    try {
      return await db.user.findMany();

    } catch (error) {
      throw new Error(error.message);

    }
  },
  create: async (userObj) => {
    try {
      const user = await db.user.create({
        data: userObj,
      });
      return user.id;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  update: async (id, userObj) => {
    try {
      const updated = await db.user.update({
        where: { id: parseInt(id) },
        data: userObj,
      });
      return updated;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },
  delete: async (id) => {
    try {
      return await db.user.delete({
        where: {
          id: parseInt(id),
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  increaseWallet: async (data) => {
    try {
      return await db.transaction.create({
        data: data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getWalletBalance: async (id) => {
    try {
      const userBalance = await transactions.getWalletBalance(id);
      return userBalance;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getAllUserOrders: async (id) => {
    try {
      const userOrders = await orders.getOrderByUserId(id);
      return userOrders;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = userService;
