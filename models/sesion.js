'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sesion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sesion.hasMany(models.Reserva,{
        foreignKey:"id_sesion"
      }),
      Sesion.belongsTo(models.Proyecto,{
        foreignKey:"id_proyecto"
      })
    }
  };
  Sesion.init({
    id_proyecto: DataTypes.INTEGER,
    cumplida: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Sesion',
    timestamps: false,
  });
  return Sesion;
};