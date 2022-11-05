import Sequelize from 'sequelize';

import User from '../app/models/User';
import Event from '../app/models/Event';
import File from '../app/models/File';
import Eventstousers from '../app/models/Eventstousers';
import Loja from '../app/models/Loja';
import Cliente from '../app/models/Cliente';
import Vendas from '../app/models/vendas';

import databaseConfig from '../config/database';

const models = [User, Event, File, Eventstousers, Loja, Cliente, Vendas];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(
        model =>
          model && model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();

// criar migrations npx sequelize-cli model:generate --name eventstousers --attributes firstName:string
// npx sequelize-cli db:migrate
