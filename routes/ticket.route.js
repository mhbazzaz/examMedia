const express = require("express");
const { ticketController } = require("../modules").ticketApp;
const { body, validationResult } = require("express-validator");
const checkError = require("../middlewares/validator");
const { userValidator } = require("../validators");
const { tokenAuthentication } = require("../middlewares/auth");
const router = express.Router();

router.post("/", ticketController.newTicket);
router.patch("/:id", ticketController.updated);
router.delete("/:id", ticketController.delete);
router.delete("/", ticketController.deleteMany);
router.get("/", ticketController.getAll);
router.get("/:id", ticketController.getTicket);
// router.post(
//   "/api/v1/ticket/query?from=&to=&arrival=&departure=",
//   ticketController
// );
// router.get("/api/v1/ticket/query/:id", ticketController);

module.exports = router;
