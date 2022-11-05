import Sequelize, { Model } from 'sequelize';

class Vendas extends Model {
  static init(sequelize) {
    super.init(
      {
        venda_data: Sequelize.DATE,
        venda_valor: Sequelize.FLOAT,
        venda_preesentee: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Cliente, {
      foreignKey: 'cliente_id',
      as: 'clientes',
    });
    this.belongsTo(models.Loja, {
      foreignKey: 'loja_id',
      as: 'lojas',
    });
  }
}

export default Vendas;
