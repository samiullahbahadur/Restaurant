// "use strict";

"use strict";
import { Model } from "sequelize";
import bcrypt from "bcrypt";

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Add associations here if needed
    }

    // Check password
    async validPassword(password) {
      return await bcrypt.compare(password, this.password);
    }
  }
  User.init(
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("customer", "waiter", "chef", "manager", "admin"),
        allowNull: false,
        defaultValue: "customer",
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (user) => {
          user.password = await bcrypt.hash(user.password, 10);
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
      },
    }
  );
  return User;
};
