const express = require("express");
const { ticketController } = require("../modules").ticketApp;
const { body, validationResult } = require("express-validator");
const checkError = require("../middlewares/validator");
const { userValidator } = require("../validators");
const { tokenAuthentication } = require("../middlewares/auth");
const router = express.Router();

router.post("/api/tikect", ticketController.newTicket);
router.patch("/api/ticket/:id", ticketController.updated);
router.delete("/api/v1/ticket/:id", ticketController.delete);
router.delete("/api/v1/ticket", ticketController.deleteMany);
router.get("/api/v1/ticket/", ticketController.getAll);
router.get("/api/v1/ticket/:id", ticketController.getTicket);
// router.post(
//   "/api/v1/ticket/query?from=&to=&arrival=&departure=",
//   ticketController
// );
// router.get("/api/v1/ticket/query/:id", ticketController);

module.exports = router;
