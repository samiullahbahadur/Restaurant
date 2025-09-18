"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      userId: DataTypes.INTEGER,
      tableId: DataTypes.INTEGER,
      status: {
        type: sequelize.ENUM("pending", "preparing", "ready", "served"),
        allowNull: false,
        defaultValue: "pending",
      },
      totalAmount: DataTypes.DECIMAL,
      specialInstructions: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
