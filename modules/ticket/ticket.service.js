const db = require("../../database/db");

const ticketService = {
  getTicketById: async (id) => {
    try {
      return await db.ticket.findUnique({
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
      return await db.ticket.findMany();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  create: async (ticketObj) => {
    try {
      const ticket = await db.ticket.create({
        data: ticketObj,
      });
      return ticket.id;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  update: async (id, ticketObj) => {
    try {
      const result = await db.ticket.update({
        where: { id: parseInt(id) },
        data: ticketObj,
      });
      return result;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },
  delete: async (id) => {
    try {
      return await db.ticket.delete({
        where: {
          id: parseInt(id),
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  //create query
  //get ticket by query
};

module.exports = ticketService;
