const db = require("../../db");

const userService = {
  authenticate: async (phone, password) => {},
  getUserByPhoneNumber: async function (phone) {
    const user = await this.getByPhone(phone);
    return user;
  },
  getUserById: async (id) => {
    return await db.user.findUnique({
      where: {
        id,
      },
    });
  },
  
  getAll: async () => {
    return await db.user.findMany();
  },
  create: async (data) => {
    try {
      const user = await db.user.create({
        data: data,
      });
      return user.id;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  update: async (id, data) => {
    try {
      const result = await db.user.update({
        where: { id: parseInt(id) },
        data: data,
      });
      return result;
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
};

module.exports = userService;
