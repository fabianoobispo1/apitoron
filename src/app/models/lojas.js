import Sequelize, { Model } from 'sequelize';

class Loja extends Model {
  static init(sequelize) {
    super.init(
      {
        loja_nome: Sequelize.STRING,
        loja_endereco: Sequelize.STRING,
        loja_sigla: Sequelize.STRING,
        loja_telefone: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Loja;
