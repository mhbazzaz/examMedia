const express = require("express");
const { ticketController } = require("../modules").ticketApp;
const { body, validationResult } = require("express-validator");
const checkError = require("../middlewares/validator");
const { userValidator } = require("../validators");
const { tokenAuthentication } = require("../middlewares/auth");
const router = express.Router();

router.post("/api/tikect", ticketController);
router.patch("/api/ticket/:id", ticketController);
router.delete("/api/v1/ticket/:id", ticketController);
router.delete("/api/v1/ticket", ticketController);
router.get("/api/v1/ticket/", ticketController);
router.get("/api/v1/ticket/:id", ticketController);
router.post(
  "/api/v1/ticket/query?from=&to=&arrival=&departure=",
  ticketController
);
router.get("/api/v1/ticket/query/:id", ticketController);



module.exports = router;
