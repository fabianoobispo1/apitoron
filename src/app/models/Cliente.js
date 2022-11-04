import Sequelize, { Model } from 'sequelize';

class Cliente extends Model {
  static init(sequelize) {
    super.init(
      {
        cliente_nome: Sequelize.STRING,
        cliente_telefone: Sequelize.STRING,
        cliente_data_nascimento: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Cliente;
