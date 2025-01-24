"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NotificationToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NotificationToken.init(
    {
      subject: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.STRING, allowNull: false },
      recepientEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["PENDING", "SUCCESS", "FAILED"],
      },
      notificationTime: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "NotificationToken",
    }
  );
  return NotificationToken;
};
