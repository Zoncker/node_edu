'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};