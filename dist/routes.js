"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('./config/multer'); var _multer4 = _interopRequireDefault(_multer3);

var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _EventController = require('./app/controllers/EventController'); var _EventController2 = _interopRequireDefault(_EventController);
var _EventstousersController = require('./app/controllers/EventstousersController'); var _EventstousersController2 = _interopRequireDefault(_EventstousersController);

var _FileController = require('./app/controllers/FileController'); var _FileController2 = _interopRequireDefault(_FileController);

var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const routes = new (0, _express.Router)();
const upload = _multer2.default.call(void 0, _multer4.default);

// realizar login
routes.post('/sessions', _SessionController2.default.store);
routes.post('/sessioncpf', _SessionController2.default.loginCpf);

// auth
routes.use(_auth2.default);

// recuperar info usuario
routes.get('/me', _UserController2.default.userInfo);

routes.post('/files', upload.single('file'), _FileController2.default.store);

// cadastrar usuario
routes.post('/createuser', _UserController2.default.createUser);

// adiministrador
routes.post('/verificaadministrador', _UserController2.default.verificaadministrador);
routes.post('/administradorupdate', _UserController2.default.administradorUpdate);

// eventos
routes.get('/listevents', _EventController2.default.listarEvento);
routes.post('/createevents', _EventController2.default.criarEvento);

// eventos por usuario
routes.post(
  '/listeventsToUserEmail',
  _EventstousersController2.default.listeventsToUserEmail
);

// auth
routes.use(_auth2.default);
exports. default = routes;
