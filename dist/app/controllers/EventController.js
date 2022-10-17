"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Event = require('../models/Event'); var _Event2 = _interopRequireDefault(_Event);

class EventController {
  async criarEvento(req, res) {
    const schema = Yup.object().shape({
      nome_evento: Yup.string().required(),
      endereco_evento: Yup.string().required(),
      descricao_evento: Yup.string().required(),
      data_evento: Yup.date(),
      quantidade_ingressos: Yup.string().required(),
      valor_ingressos: Yup.number().test(
        'is-decimal',
        'invalid decimal',
        value => `${value}`.match(/^\d*\.{1}\d*$/)
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro de validação, confira seus dados.' });
    }

    const eventNameExists = await _Event2.default.findOne({
      where: { nome_evento: req.body.nome_evento },
    });

    if (eventNameExists) {
      return res.status(400).json({ error: 'nome do evento já cadastrado.' });
    }

    const {
      id,
      nome_evento,
      endereco_evento,
      descricao_evento,
      data_evento,
      quantidade_ingressos,
      valor_ingressos,
    } = await _Event2.default.create(req.body);

    return res.json({
      id,
      nome_evento,
      endereco_evento,
      descricao_evento,
      data_evento,
      quantidade_ingressos,
      valor_ingressos,
    });
  }

  async listarEvento(req, res) {
    const listEvents = await _Event2.default.findAll();

    return res.json({ listEvents });
  }
}

exports. default = new EventController();
