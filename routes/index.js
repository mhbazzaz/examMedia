const userRouter = require("./user.route");
// const vehicleRouter = require("./order.route");
// const rentRouter = require("./ticket.route");

module.exports = router;

function router(app) {
  app.use("/api/user", userRouter);
//   app.use("/api/order", orderRouter);
//   app.use("/api/ticket", ticketRouter);
}
