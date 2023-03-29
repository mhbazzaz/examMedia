const express = require("express");
const { orderController } = require("../modules").orderApp;
const { body, validationResult } = require("express-validator");
const checkError = require("../middlewares/validator");
const { userValidator } = require("../validators");
const { tokenAuthentication } = require("../middlewares/auth");
const router = express.Router();

router.post("/", orderController.newOrder);
router.patch("/:id", orderController.updated);
router.patch("/:id/cancel", orderController.canceled);
router.patch("/:id/pay", orderController.paid);



module.exports = router;
