import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        cpf: Sequelize.STRING,
        nome: Sequelize.STRING,
        administrador: Sequelize.BOOLEAN,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        hooks: {
          beforeSave: async user => {
            if (user.password) {
              user.password_hash = await bcrypt.hash(user.password, 8);
            }
          },
          beforeBulkUpdate: async user => {
            if (user.attributes.password) {
              user.attributes.password_hash = await bcrypt.hash(
                user.attributes.password,
                8
              );
            }
          },
        },
        sequelize,
      }
    );

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
