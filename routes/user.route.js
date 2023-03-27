const express = require("express");
const { userController } = require("../modules").userApp;
const { body, validationResult } = require("express-validator");
const checkError = require("../middlewares/validator");
const { userValidator } = require("../validators");
const { tokenAuthentication } = require("../middlewares/auth");
const router = express.Router();

router.post("/api/v1/user", userController.register);
router.patch("/api/v1/user:id", userController.updated);
router.delete("/api/v1/user:id", userController.delete);
router.get("/api/v1/user:id", userController.getUser);
router.head("/api/v1/user:phone", userController.getUserByPhoneNumber);
router.get("/api/v1/user/order", userController);
router.post("/api/v1/user/wallet", userController);
router.get("/api/v1/user/wallet", userController);



//use validator and auth middleware

module.exports = router;
