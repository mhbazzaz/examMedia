const { db , Status} = require("../../database/db");
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
      const { userId, ticketId, status, count } = orderData;
      const modifyCount = parseInt(count) - parseInt(orderData.count);
      const [order, _] = await db.$transaction([
        db.order.create({
          data: {
            userId,
            ticketId,
            status: Status.RESERVED,
            count,
          },
        }),
        db.ticket.update({
          where: {
            id: ticketId,
          },
          data: {
            count: modifyCount,
          },
        }),
        // and we should calculate the price , and change wallet balance and check wallet balance for payment
      ]);

      return exclude(order, ["userId" , "ticketId"]);
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
  cancel: async (id) => {
    try {
      const canceled = await db.order.update({
        where: {
          id: parseInt(id),
        },
        status: Status.CANCELED,
      });
      //and we should +n the count of ticket
      return res.json("The order was canceled!");
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },
  pay: async (id) => {
    try {
      const result = await db.order.update({
        where: {
          id: parseInt(id),
        },
        status: Status.PAID,
      });
      //and decrease user wallet
      return result;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },
};

module.exports = orderService;
