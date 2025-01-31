const sender = require("../config/emailConfig");
const TicketRepository = require("../repository/ticket-repository");
const repo = new TicketRepository();

const sendBasicMail = (mailFrom, mailTo, mailBody, mailSubject) => {
  sender.sendMail({
    from: mailFrom,
    to: mailTo,
    subject: mailSubject,
    text: mailBody,
  });
};

const fetchPendingEmails = async () => {
  try {
    const response = await repo.get({ status: "PENDING" });
    return response;
  } catch (error) {
    console.log("error in service layer :", error);
  }
};

const createNotification = async (data) => {
  try {
    const response = await repo.create(data);
    return response;
  } catch (error) {
    console.log("error while creating notification ", error);
  }
};

const getByPk = async (ticketId) => {
  try {
    const response = await repo.getByPk(ticketId);
    return response;
  } catch (error) {
    console.log("error while get by pk", error);
  }
};

const update = async (ticketId, data) => {
  try {
    const response = await repo.update(ticketId, data);
    return response;
  } catch (error) {
    console.log("error while updating", error);
  }
};

module.exports = {
  sendBasicMail,
  fetchPendingEmails,
  createNotification,
  getByPk,
  update,
};
