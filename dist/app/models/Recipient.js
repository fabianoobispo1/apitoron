"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Recipient extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: _sequelize2.default.STRING,
        street: _sequelize2.default.STRING,
        number: _sequelize2.default.STRING,
        complement: _sequelize2.default.STRING,
        state: _sequelize2.default.STRING,
        city: _sequelize2.default.STRING,
        cep: _sequelize2.default.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

exports. default = Recipient;
