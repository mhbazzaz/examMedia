const db = require("../../database/db");
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
  createRefresh: async (data) => {
    try {
      const jwtRefresh = await db.RefreshToken.create({
        data: data,
      });
      return jwtRefresh;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  findRefresh: async (token) => {
    try {
      const { id } = token;
      const refreshToken = await db.RefreshToken.findUnique({
        where: {
          id,
        },
      });
      return refreshToken;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  deleteRefresh: async (tokenId) => {
    try {
      const deletedToken = await db.RefreshToken.delete({
        where: {
          id: parseInt(tokenId),
        },
      });
      return deletedToken;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = userService;
