const cron = require("node-cron");
const emailService = require("../services/email-service");
const sender = require("../config/emailConfig");
const setupJobs = () => {
  cron.schedule("* * * * *", async () => {
    // console.log("hi this is from Cron");
    // sendBasicMail(
    //   "support@admin.com",
    //   "airlinebooking48@gmail.com",
    //   "this is email testing",
    //   "Fuck you bab"
    // );
    const response = await emailService.fetchPendingEmails();
    response.forEach((email) => {
      sender.sendMail(
        {
          to: email.recepientEmail,
          subject: email.subject,
          text: email.content,
        },
        async (error, data) => {
          if (error) {
            console.log(error);
          } else {
            console.log(data);
            await emailService.update(email.id, { status: "SUCCESS" });
          }
        }
      );
    });

    console.log(response);
  });
};

module.exports = setupJobs;
