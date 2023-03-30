const express = require("express");
const { orderController } = require("../modules").orderApp;
// const { body, validationResult } = require("express-validator");
// const checkError = require("../middlewares/validator");
// const { userValidator } = require("../validators");
const { tokenAuthentication } = require("../middlewares/auth");
const router = express.Router();

router.post("/", tokenAuthentication ,orderController.newOrder);
router.patch("/:id", tokenAuthentication, orderController.updated);
router.patch("/:id/cancel", tokenAuthentication ,orderController.canceled);
router.patch("/:id/pay", tokenAuthentication ,orderController.paid);



module.exports = router;
