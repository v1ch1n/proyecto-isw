'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reserva.belongsTo(models.Sesion,{
        foreignKey:"id_sesion"
      })
    }
  };
  Reserva.init({
    id_sesion: DataTypes.INTEGER,
    timestamp: DataTypes.DATE,
    id_maquina: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reserva',
    timestamps: false,
  });
  return Reserva;
};