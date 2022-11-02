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
          // dessa maneira para inserir funciona
          beforeSave: async user => {
            console.log('hook insert');
            if (user.password) {
              user.password_hash = await bcrypt.hash(user.password, 8);
            }
          },
          beforeUpdate: async user => {
            console.log('hook update');
            if (user.password) {
              user.password_hash = await bcrypt.hash(user.password, 8);
            }
          },
        },
        sequelize,
      }
    );

    /*
      dessa maneira o hook de insert funciona
      this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    }); */

    // dessa maneira nao funcionou
    /*     this.addHook('beforeUpdate', async user => {
      console.log('hook update');
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    }); */

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
