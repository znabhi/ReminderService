const { where, Op } = require("sequelize");
const { NotificationTicket } = require("../models/index");

class TicketRepository {
  async get(filter) {
    try {
      const response = await NotificationTicket.findAll({
        where: {
          status: filter.status,
          notificationTime: {
            [Op.lte]: new Date(),
          },
        },
      });
      return response;
    } catch (error) {
      console.log("repository layer :", error);
    }
  }

  async create(data) {
    try {
      const response = await NotificationTicket.create(data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getByPk(ticketId) {
    try {
      const response = await NotificationTicket.findByPk(ticketId);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async update(ticketId, data) {
    try {
      const ticket = await NotificationTicket.findByPk(ticketId);
      if (data.status) ticket.status = data.status;
      await ticket.save();
      return ticket;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = TicketRepository;
