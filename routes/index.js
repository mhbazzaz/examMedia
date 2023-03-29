const userRouter = require("./user.route");
const ticketRouter = require("./order.route");
const orderRouter = require("./ticket.route");


function router(app) {
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/order", orderRouter);
  app.use("/api/v1/ticket", ticketRouter);
}


module.exports = router;
