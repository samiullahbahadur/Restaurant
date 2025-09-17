"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reservation.init(
    {
      userId: DataTypes.INTEGER,
      tableId: DataTypes.INTEGER,
      date: DataTypes.DATE,
      timeSlot: DataTypes.STRING,
      status: DataTypes.STRING("pedding", "confirmed", "cancelled"),
    },
    {
      sequelize,
      modelName: "Reservation",
    }
  );
  return Reservation;
};
