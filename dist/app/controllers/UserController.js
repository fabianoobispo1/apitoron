"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _util = require('util');
var _auth = require('../../config/auth'); var _auth2 = _interopRequireDefault(_auth);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async createUser(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      cpf: Yup.string().required(),

      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro de validação, confira seus dados.' });
    }

    const userEmailExists = await _User2.default.findOne({
      where: { email: req.body.email },
    });

    if (userEmailExists) {
      return res
        .status(400)
        .json({ error: 'Endereço de e-mail já cadastrado.' });
    }

    const userCpfExists = await _User2.default.findOne({ where: { cpf: req.body.cpf } });

    if (userCpfExists) {
      return res.status(400).json({ error: 'Cpf já cadastrado.' });
    }

    const { id, cpf, nome, email } = await _User2.default.create(req.body);

    return res.json({ id, cpf, nome, email });
  }

  async userInfo(req, res) {
    const [, token] = req.headers.authorization.split(' ');

    try {
      const decoded = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(token, _auth2.default.secret);
      req.userId = decoded.id;

      const resultUser = await _User2.default.findOne({
        where: { id: decoded.id },
      });
      const { id, cpf, nome, administrador, email } = resultUser.dataValues;
      return res.json({ id, cpf, nome, administrador, email });
    } catch (err) {
      return res.status(401).json({ error: 'Token inválido.' });
    }
  }

  async verificaadministrador(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro de validação, confira seus dados.' });
    }

    const resultUser = await _User2.default.findOne({
      where: { email: req.body.email },
    });

    const { administrador } = resultUser.dataValues;

    return res.json({ administrador });
  }

  async administradorUpdate(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      administrador: Yup.boolean().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro de validação, confira seus dados.' });
    }

    const resultUser = await _User2.default.findOne({
      where: { email: req.body.email },
    });

    const { administrador } = resultUser.dataValues;

    if (req.body.administrador === administrador) {
      if (administrador) {
        return res.json({ res: 'usuario ja e um adminisrtador' });
      }
      return res.json({ res: 'usuario nao e um adminisrtador' });
    }

    if (administrador) {
      await _User2.default.update(
        { administrador: '0' },
        {
          where: { email: req.body.email },
        }
      );
      return res.json({ res: 'Agora usuario nao e um adminisrtador' });
    }
    await _User2.default.update(
      { administrador: '1' },
      {
        where: { email: req.body.email },
      }
    );
    return res.json({ res: 'Agora usuario e um adminisrtador' });
  }
}

exports. default = new UserController();
