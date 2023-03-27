const orderService = require("./order.service");

const orderController = {
  async getOrder(req, res) {
    try {
      const { id } = req.params;
      const order = await orderService.getOrderById(parseInt(id));
      res.status(200).json(order);
    } catch (error) {
      res.status(403).json({
        error: true,
        message: error.message,
      });
    }
  },

  async newOrder(req, res) {
    try {
      const order = await orderService.create(req.body);
      return res.status(201).json(order);
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
      const updated = await orderService.update(parseInt(id), req.body);
      res.status(200).json(updated);
    } catch (error) {
      res.status(400).json({
        error: true,
        message: error.message,
      });
    }
  },
  async canceled(req, res) {
    try {
      const { id, status } = req.params;
      const canceled = await orderService.cancel(parseInt(id), status);
      res.status(205).json(canceled);
    } catch (error) {
      res.status(400).json({
        error: true,
        message: error.message,
      });
    }
  },
  async paid(req, res) {
    try {
      const { id, status } = req.params;
      const paid = await orderService.pay(parseInt(id), status);
      res.status(205).json(paid);
    } catch (error) {
      res.status(400).json({
        error: true,
        message: error.message,
      });
    }
  },
};

module.exports = orderController;
