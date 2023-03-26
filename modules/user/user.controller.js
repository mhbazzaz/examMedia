const { getUserByPhoneNumber } = require("./user.service");
const userService = require("./user.service");

const userControl = {
  async getUser(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(parseInt(id));
      res.status(200).json(user);
    } catch (error) {
      res.status(403).json({
        error: true,
        message: error.message,
      });
    }
  },
  async getUserByPhoneNumber(req, res) {
    try {
      const { phone } = req.params;
      const user = await userService.getUserByPhoneNumber(phone);
      res.status(200).json(user);
    } catch (error) {
      res.status(403).json({
        error: true,
        message: error.message,
      });
    }
  },
  async getAll(req, res) {
    try {
      const all = await userService.getAll();
      res.status(200).json(all);
    } catch (error) {
      res.status(403).json({
        error: true,
        message: error.message,
      });
    }
  },

  async register(req, res) {
    try {
      const user = await userService.create(req.body);
      return res.status(201).json(user);
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
      const updated = await userService.update(parseInt(id), req.body);
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
      const deleted = await userService.delete(parseInt(id));
      res.status(205).json(deleted);
    } catch (error) {
      res.status(400).json({
        error: true,
        message: error.message,
      });
    }
  },
};
module.exports = userControl;
