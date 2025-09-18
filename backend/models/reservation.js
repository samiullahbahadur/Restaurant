"use strict";

import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
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
      status: {
        type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
        allowNull: false,
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "Reservation",
    }
  );
  return Reservation;
};
