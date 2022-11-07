module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('vendas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      cliente_id: {
        type: Sequelize.INTEGER,
        references: { model: 'clientes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      loja_id: {
        type: Sequelize.INTEGER,
        references: { model: 'lojas', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      venda_data: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      venda_valor: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      venda_preesente: {
        type: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable('vendas');
  },
};
