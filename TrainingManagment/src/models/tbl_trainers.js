'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_trainers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tbl_trainers.init({
    trainer_name: DataTypes.STRING,
    trainer_email: DataTypes.STRING,
    trainer_phone: DataTypes.STRING,
    trainer_address: DataTypes.STRING,
    trainer_photo_url: DataTypes.STRING(1234),
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'tbl_trainers',
  });
  return tbl_trainers;
};