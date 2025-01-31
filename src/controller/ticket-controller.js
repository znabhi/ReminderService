const TicketService = require("../services/email-service");

const create = async (req, res) => {
  try {
    const response = await TicketService.createNotification(req.body);
    return res.status(201).json({
      data: response,
      success: true,
      message: "successfully created the notifaction",
      error: {},
    });
  } catch (error) {
    console.log("error from controller", error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "not created yet",
      error: error,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const response = await TicketService.getAll();
    return res.status(200).json({
      data: response,
      success: false,
      message: "getting all the notification",
      error: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "sorry not able to getting the data",
      error: error,
    });
  }
};

const getById = async (req, res) => {
  try {
    const response = await TicketService.getByPk(req.params.id);
    return res.status(200).json({
      data: response,
      success: true,
      message: "successfully getted",
      error: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "sorry not able to get the data",
      error: { error },
    });
  }
};

// const update = async(req,res)=>{
//   try {
//     const response  = await TicketService.update(req.params.id,req.body);
//   } catch (error) {

//   }
// }

module.exports = { create, getAll, getById };
