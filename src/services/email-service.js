const sender = require("../config/emailConfig");

const sendBasicMail = (mailFrom, mailTo, mailBody, mailSubject) => {
  sender.sendMail({
    from: mailFrom,
    to: mailTo,
    subject: mailSubject,
    text: mailBody,
  });
};

module.exports = sendBasicMail;
