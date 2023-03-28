const db = require("../../db");

const ticketService = {
  
  getTicketById: async (id) => {
    return await db.ticket.findUnique({
      where: {
        id,
      },
    });
  },
  
  getAll: async () => {
    return await db.ticket.findMany();
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
