const sender = require("../config/emailConfig");
const TicketRepository = require("../repository/ticket-repository");
const repo = new TicketRepository();

const sendBasicMail = (data) => {
  const { subject, content, recepientEmail } = data;

  sender.sendMail({
    from: "support@admin.com",
    to: recepientEmail,
    subject: subject,
    text: content,
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

const sendingCreateNoticationToken = async (payload) => {
  try {
    let service = payload.service;
    let data = payload.data;
    switch (service) {
      case "CREATE_TOKEN":
        await createNotification(data);
        break;
      case "SEND_BASIC_EMAIL":
        await sendBasicMail(data);
        break;
      default:
        console.log("No valid serivce");
        break;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  sendBasicMail,
  fetchPendingEmails,
  createNotification,
  getByPk,
  update,
  sendingCreateNoticationToken,
};
