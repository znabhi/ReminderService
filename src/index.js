const express = require("express");
const app = express();
const { PORT } = require("./config/serverConfig");
const TicketController = require("./controller/ticket-controller");
const sendBasicMail = require("./services/email-service");
const cron = require("node-cron");
const setupJobs = require("./utlis/jobs");
const setupAndStartServer = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.listen(PORT, () => {
    console.log(`Server is Started on ${PORT}`);
    setupJobs();
    // sendBasicMail(
    //   "support@admin.com",
    //   "airlinebooking48@gmail.com",
    //   "this is email testing",
    //   "Fuck you bab"
    // );
    // cron.schedule("*/2 * * * *", () => {
    //   console.log("hi this is from Cron");
    // });
    app.post("/api/v1/ticket", TicketController.create);
  });
};

setupAndStartServer();
