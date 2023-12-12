'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderDetail.init({
    order: DataTypes.STRING,
    item: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    subtotal: DataTypes.DECIMAL,
    kitchenId: DataTypes.INTEGER,
    menuId: DataTypes.INTEGER,
    waitersId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};