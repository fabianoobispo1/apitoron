"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

var _User = require('../app/models/User'); var _User2 = _interopRequireDefault(_User);
var _Event = require('../app/models/Event'); var _Event2 = _interopRequireDefault(_Event);
var _Recipient = require('../app/models/Recipient'); var _Recipient2 = _interopRequireDefault(_Recipient);
var _Deliveryman = require('../app/models/Deliveryman'); var _Deliveryman2 = _interopRequireDefault(_Deliveryman);
var _Order = require('../app/models/Order'); var _Order2 = _interopRequireDefault(_Order);
var _DeliveryProblem = require('../app/models/DeliveryProblem'); var _DeliveryProblem2 = _interopRequireDefault(_DeliveryProblem);
var _File = require('../app/models/File'); var _File2 = _interopRequireDefault(_File);
var _Eventstousers = require('../app/models/Eventstousers'); var _Eventstousers2 = _interopRequireDefault(_Eventstousers);

var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

const models = [
  _User2.default,
  _Event2.default,
  _Recipient2.default,
  _Deliveryman2.default,
  _Order2.default,
  _File2.default,
  _DeliveryProblem2.default,
  _Eventstousers2.default,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new (0, _sequelize2.default)(_database2.default);

    models
      .map(model => model.init(this.connection))
      .map(
        model =>
          model && model.associate && model.associate(this.connection.models)
      );
  }
}

exports. default = new Database();

// criar migrations npx sequelize-cli model:generate --name eventstousers --attributes firstName:string
