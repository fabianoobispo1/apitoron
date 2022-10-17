"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Event extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        quantidade_ingressos: _sequelize2.default.INTEGER,
        valor_ingressos: _sequelize2.default.DECIMAL,
        nome_evento: _sequelize2.default.STRING,
        data_evento: _sequelize2.default.DATE,
        endereco_evento: _sequelize2.default.STRING,
        descricao_evento: _sequelize2.default.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

exports. default = Event;
