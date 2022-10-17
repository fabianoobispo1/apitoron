"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Eventstousers = require('../models/Eventstousers'); var _Eventstousers2 = _interopRequireDefault(_Eventstousers);

class EventstousersController {
  async listeventsToUserEmail(req, res) {
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

    const userEmailExists = await _User2.default.findOne({
      where: { email: req.body.email },
    });

    if (!userEmailExists) {
      return res
        .status(400)
        .json({ error: 'Endereço de e-mail já cadastrado.' });
    }

    const eventUserExists = await _Eventstousers2.default.findAll({
      where: { user_id: userEmailExists.id },
    });

    return res.json({ eventUserExists });
  }
}

exports. default = new EventstousersController();
