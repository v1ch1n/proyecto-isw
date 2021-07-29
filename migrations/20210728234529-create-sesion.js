'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sesions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_proyecto: {
        type: Sequelize.INTEGER,
        references:{
          model:"Proyectos",
          key:"id",
          as:"id_proyecto"
        }
      },
      cumplida: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sesions');
  }
};