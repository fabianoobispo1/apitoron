import Sequelize, { Model } from 'sequelize';

class Eventstousers extends Model {
  static init(sequelize) {
    super.init(
      {
        data_compra: Sequelize.DATE,
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

export default Eventstousers;
