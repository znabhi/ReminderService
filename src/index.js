const express = require("express");
const app = express();
const { PORT } = require("./config/serverConfig");
const TicketController = require("./controller/ticket-controller");
const sendBasicMail = require("./services/email-service");
const cron = require("node-cron");
const { REMINDER_BINDING_KEY } = require("./config/serverConfig");
const { createChannel, subscribeMessage } = require("./utlis/messageQueue");
const emailService = require("./services/email-service");
const setupJobs = require("./utlis/jobs");
const setupAndStartServer = async () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.post("/api/v1/ticket", TicketController.create);

  const channle = await createChannel();
  subscribeMessage(
    channle,
    emailService.sendingCreateNoticationToken,
    REMINDER_BINDING_KEY
  );

  app.listen(PORT, async () => {
    console.log(`Server is Started on ${PORT}`);
    // setupJobs();
    // sendBasicMail(
    //   "support@admin.com",
    //   "airlinebooking48@gmail.com",
    //   "this is email testing",
    //   "Fuck you bab"
    // );
    // cron.schedule("*/2 * * * *", () => {
    //   console.log("hi this is from Cron");
    // });
  });
};

setupAndStartServer();
