const express = require("express");
const app = express();
const { PORT } = require("./config/serverConfig");
const sendBasicMail = require("./services/email-service");
const setupAndStartServer = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  sendBasicMail(
    "support@admin.com",
    "airlinebooking48@gmail.com",
    "this is email testing",
    "Fuck you bab"
  );

  app.listen(PORT, () => {
    console.log(`Server is Started on ${PORT}`);
  });
};

setupAndStartServer();
