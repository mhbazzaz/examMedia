const userRouter = require("./user.route");
const ticketRouter = require("./order.route");
const orderRouter = require("./ticket.route");


function router(app) {
  app.use("/api/user", userRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/ticket", ticketRouter);
}


module.exports = router;
