module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('periodoalertas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      periodo_dias: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      periodo_nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('periodoalertas');
  },
};
