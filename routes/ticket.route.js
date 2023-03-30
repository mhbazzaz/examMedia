const express = require("express");
const { ticketController } = require("../modules").ticketApp;
// const { body, validationResult } = require("express-validator");
// const checkError = require("../middlewares/validator");
// const { userValidator } = require("../validators");
const { tokenAuthentication } = require("../middlewares/auth");
const router = express.Router();

router.post("/", tokenAuthentication ,ticketController.newTicket);
router.patch("/:id", tokenAuthentication ,ticketController.updated);
router.delete("/:id", tokenAuthentication ,ticketController.delete);
router.delete("/", tokenAuthentication ,ticketController.deleteMany);
router.get("/", tokenAuthentication ,ticketController.getAll);
router.get("/:id", tokenAuthentication ,ticketController.getTicket);
// router.post(
//   "/query?from=&to=&arrival=&departure=",
//   ticketController
// );
// router.get("/query/:id", ticketController);

module.exports = router;
