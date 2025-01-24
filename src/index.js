const express = require("express");
const app = express();
const { PORT } = require("./config/serverConfig");
const sendBasicMail = require("./services/email-service");
const cron = require("node-cron");
const setupAndStartServer = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.listen(PORT, () => {
    console.log(`Server is Started on ${PORT}`);

    // sendBasicMail(
    //   "support@admin.com",
    //   "npm @gmail.com",
    //   "this is email testing",
    //   "Fuck you bab"
    // );

    cron.schedule("*/2 * * * *", () => {
      console.log("hi this is from Cron");
    });
  });
};

setupAndStartServer();
