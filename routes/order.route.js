const express = require("express");
const { orderController } = require("../modules").orderApp;
const { body, validationResult } = require("express-validator");
const checkError = require("../middlewares/validator");
const { userValidator } = require("../validators");
const { tokenAuthentication } = require("../middlewares/auth");
const router = express.Router();

router.post("/api/v1/order", orderController.newOrder);
router.patch("/api/order/:id", orderController.updated);
router.patch("/api/order/:id/cancel", orderController.canceled);
router.patch("/api/order/:id/pay", orderController.paid);



module.exports = router;
