const db = require("./database/db");
const ExpressLoader = require("./loaders/expressLoader");
require("dotenv").config()


async function connectionCheck() {
  await db.$connect();
}

(function main() {
  connectionCheck()
    .then(async () => {
      console.log("connect to DB!");
      const app = new ExpressLoader();
      app.run();
    })
    .catch(async (error) => {
      console.error(error);
      await db.$disconnect();
    });
})();
