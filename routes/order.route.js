const express = require("express");
const { orderController } = require("../modules").orderApp;
const { body, validationResult } = require("express-validator");
const checkError = require("../middlewares/validator");
const { userValidator } = require("../validators");
const { tokenAuthentication } = require("../middlewares/auth");
const router = express.Router();

router.post("/api/v1/order", orderController);
router.patch("/api/order/:id", orderController);
router.patch("/api/order/:id/cancel", orderController);
router.patch("/api/order/:id/pay", orderController);



module.exports = router;
