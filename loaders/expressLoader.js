const express = require("express");
const errorHandler = require("../middlewares/errorHandler");
const router = require("../routes");
const config = require("../config");

class ExpressLoader {
  constructor() {
    this.app = express();
    this.app.use(express.json());
    const apiRoute = express.Router();
    router(apiRoute);

    this.app.use("/api", apiRoute);
    this.app.get("/error", (req, res) => {
      throw new Error("WE HAVE ERROR!");
    });

    this.app.use(errorHandler);

    this.app.use((req, res) => {
      res.status(404).send({
        error: "NotFoundError",
      });
    });
  }
  run() {
    this.app.listen(config.PORT, () => {
      console.log(`server run on por ${config.PORT}`);
    });
  }
}

module.exports = ExpressLoader;
