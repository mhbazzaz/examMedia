const express = require("express");
const { userController } = require("../modules").userApp;
const checkError = require("../middlewares/validator");
const { tokenAuthentication } = require("../middlewares/auth");
const router = express.Router();



router.post("/", tokenAuthentication, checkError , userController.register);
router.patch("/:id", tokenAuthentication, userController.updated);
router.delete("/:id", tokenAuthentication, userController.delete);
router.get("/:id", tokenAuthentication, userController.getUser);
router.head(
  "/:phone",
  tokenAuthentication,
  userController.getUserByPhoneNumber
);
router.get("/order", tokenAuthentication, userController.getAllUserOrders);
router.post(
  "/wallet",
  tokenAuthentication,
  userController.increaseWalletBalance
);
///route baraye login addi
router.get("/wallet", tokenAuthentication, userController.getUserWallet);
router.post("/auth-jwt-refresh", checkError ,userController.login);


module.exports = router;
