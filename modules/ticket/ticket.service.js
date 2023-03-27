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

  create: async (data) => {
    try {
      const ticket = await db.ticket.create({
        data: data,
      });
      return ticket.id;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  update: async (id, data) => {
    try {
      const result = await db.ticket.update({
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
