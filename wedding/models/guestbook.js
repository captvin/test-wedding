'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class guestbook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  guestbook.init({
    name: DataTypes.STRING,
    address: DataTypes.TEXT,
    phone: DataTypes.STRING,
    note: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'guestbook',
  });
  return guestbook;
};