const ticketService = require("./ticket.service");

const ticketController = {
  async getTicket(req, res) {
    try {
      const { id } = req.params;
      const ticket = await ticketService.getTicketById(parseInt(id));
      res.status(200).json(ticket);
    } catch (error) {
      res.status(403).json({
        error: true,
        message: error.message,
      });
    }
  },
  async getAll(req, res) {
    try {
      const allTickets = await ticketService.getAll();
      res.status(200).json(allTickets);
    } catch (error) {
      res.status(403).json({
        error: true,
        message: error.message,
      });
    }
  },

  async newTicket(req, res) {
    try {
      const ticket = await ticketService.create(req.body);
      return res.status(201).json(ticket);
    } catch (error) {
      res.status(403).json({
        error: true,
        message: error.message,
      });
    }
  },
  async updated(req, res) {
    try {
      const { id } = req.params;
      const updated = await ticketService.update(parseInt(id), req.body);
      res.status(200).json(updated);
    } catch (error) {
      res.status(400).json({
        error: true,
        message: error.message,
      });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await ticketService.delete(parseInt(id));
      res.status(205).json(deleted);
    } catch (error) {
      res.status(400).json({
        error: true,
        message: error.message,
      });
    }
  },
  async deleteMany(req, res) {
    try {
      const { ids } = req.body;
      for (const id in ids) {
        const deleted = await ticketService.delete(parseInt(id));
      }
      res.status(205).json("Deleted task was complete!");
    } catch (error) {
      res.status(400).json({
        error: true,
        message: error.message,
      });
    }
  },
};

module.exports = ticketController;
