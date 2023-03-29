const express = require("express");
const { userController } = require("../modules").userApp;
// const { body, validationResult } = require("express-validator");
// const checkError = require("../middlewares/validator");
// const { userValidator } = require("../validators");
// const { tokenAuthentication } = require("../middlewares/auth");
const router = express.Router();

router.post("/", userController.register);
router.patch("/:id", userController.updated);
router.delete("/:id", userController.delete);
router.get("/:id", userController.getUser);
router.head("/:phone", userController.getUserByPhoneNumber);
router.get("/order", userController.getAllUserOrders);
router.post("/wallet", userController.increaseWalletBalance);
router.get("/wallet", userController.getUserWallet);

//use validator and auth middleware

module.exports = router;
