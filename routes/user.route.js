const express = require("express");
const { userController } = require("../modules").userApp;
// const { body, validationResult } = require("express-validator");
// const checkError = require("../middlewares/validator");
// const { userValidator } = require("../validators");
const { tokenAuthentication } = require("../middlewares/auth");
const router = express.Router();

router.post("/", tokenAuthentication,userController.register);
router.patch("/:id", tokenAuthentication ,userController.updated);
router.delete("/:id", tokenAuthentication,userController.delete);
router.get("/:id", tokenAuthentication ,userController.getUser);
router.head("/:phone", tokenAuthentication, userController.getUserByPhoneNumber);
router.get("/order", tokenAuthentication ,userController.getAllUserOrders);
router.post("/wallet", tokenAuthentication ,userController.increaseWalletBalance);
router.get("/wallet", tokenAuthentication ,userController.getUserWallet);

//use validator and auth middleware

module.exports = router;
