"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Eventstousers extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        data_compra: _sequelize2.default.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
    this.belongsTo(models.Event, {
      foreignKey: 'event_id',
      as: 'event',
    });
  }
}

exports. default = Eventstousers;
