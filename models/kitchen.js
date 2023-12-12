'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');


module.exports = (sequelize, DataTypes) => {
  class Kitchen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Kitchen.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 35],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: true,
          len: [8, 25],
        },
      },
    },
    {
      sequelize,
      modelName: 'Kitchen',
      hooks: {
        beforeCreate: async (Kitchen, options) => {
          if (Kitchen.password) {
            const saltRounds = 10;
            Kitchen.password = await bcrypt.hash(Kitchen.password, saltRounds);
          }
        },
      },
    }
  );
  return Kitchen;
};