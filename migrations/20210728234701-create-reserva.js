'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reservas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_sesion: {
        type: Sequelize.INTEGER,
        references:{
          model:"Sesions",
          key:"id",
          as:"id_sesion"
        }
      },
      timestamp: {
        type: Sequelize.DATE
      },
      id_maquina: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reservas');
  }
};