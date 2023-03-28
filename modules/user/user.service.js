const db = require("../../db");

const userService = {
  
  getUserByPhoneNumber: async (phone) => {
    return await db.user.findUnique({
      where: {
        phone,
      },
    });
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
};

module.exports = userService;
