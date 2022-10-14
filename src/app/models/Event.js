import Sequelize, { Model } from 'sequelize';

class Event extends Model {
  static init(sequelize) {
    super.init(
      {
        quantidade_ingressos: Sequelize.INTEGER,
        valor_ingressos: Sequelize.DECIMAL,
        nome_evento: Sequelize.STRING,
        data_evento: Sequelize.DATE,
        endereco_evento: Sequelize.STRING,
        descricao_evento: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Event;
