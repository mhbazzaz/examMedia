const { order } = require("../../db");
const db = require("../../db");
const { exclude } = require("../../utils/prisma.util");

const orderService = {
  getOrderById: async (rentId) => {
    const order = await db.order.findUnique({
      where: {
        id: parseInt(orderId),
      },
    });
    return order;
  },
  createOrder: async (orderData) => {
    try {
      const { userId, ticketId, status } = orderData;

      const [order, _] = await db.$transaction([
        db.order.create({
          data: {
            userId,
            ticketId,
            status,
          },
        }),
        db.ticket.update({
          where: {
            id: ticketId,
          },
          data: {
            count: count - 1,
          },
        }),
      ]);

      return exclude(order, ["userId"]);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  update: async (id, data) => {
    try {
      const result = await db.order.update({
        where: { id: parseInt(id) },
        data: data,
      });
      return result;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },
  cancel: async (id, status) => {
    try {
      const result = await db.order.update({
        where: { id: parseInt(id) },
        status: status,
      });
      return result;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },
  pay: async (id, status) => {
    try {
      const result = await db.order.update({
        where: { id: parseInt(id) },
        status: status,
      });
      return result;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },
};

module.exports = orderService;
