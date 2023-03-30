const db = require("./database");
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
    .catch(async (e) => {
      console.error(e);
      await db.$disconnect();
    });
})();
