const express = require("express");
const { ticketController } = require("../modules").ticketApp;
const { tokenAuthentication, adminCheck } = require("../middlewares/auth");
const router = express.Router();


router.post("/", tokenAuthentication, ticketController.newTicket);
router.patch("/:id", tokenAuthentication, ticketController.updated);
router.delete("/:id", tokenAuthentication, ticketController.delete);
router.delete(
  "/",
  tokenAuthentication,
  adminCheck,
  ticketController.deleteMany
);
router.get("/", tokenAuthentication, adminCheck, ticketController.getAll);
router.get("/:id", tokenAuthentication, ticketController.getTicket);
// router.post(
//   "/query?from=&to=&arrival=&departure=",
//   ticketController
// );
// router.get("/query/:id", ticketController);

module.exports = router;
