const { order } = require("../../db");
const db = require("../../db");
const { exclude } = require("../../utils/prisma.util");

const orderService = {
  getOrderById: async (orderId) => {
    try {
      const order = await db.order.findUnique({
        where: {
          id: parseInt(orderId),
        },
      });
      return order;
    } catch (error) {
      throw new Error(error.message);
    }
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
            count: {
              decrement: order.count,
            },
          },
        }),
      ]);

      return exclude(order, ["userId"]);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getOrderByUserId: async (id) => {
    try {
      const orders = await db.order.findMany({
        where: {
          user_id: parseInt(id),
        },
      });
      return orders;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  update: async (id, orderObj) => {
    try {
      const updated = await db.order.update({
        where: { id: parseInt(id) },
        data: orderObj,
      });
      return updated;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },
  cancel: async (id, status) => {
    try {
      const canceled = await db.order.update({
        where: {
          id: parseInt(id),
        },
        status: status.canceled,
      });
      return canceled;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },
  pay: async (id, status) => {
    try {
      const result = await db.order.update({
        where: {
          id: parseInt(id),
        },
        status: status.paid,
      });
      return result;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },
};

module.exports = orderService;
