module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('lojas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      loja_nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      loja_endereco: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      loja_sigla: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      loja_telefone: {
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
    return queryInterface.dropTable('lojas');
  },
};
