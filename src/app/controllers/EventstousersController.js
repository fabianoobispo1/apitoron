import * as Yup from 'yup';
import User from '../models/User';
import Eventstousers from '../models/Eventstousers';

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

    const userEmailExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (!userEmailExists) {
      return res
        .status(400)
        .json({ error: 'Endereço de e-mail já cadastrado.' });
    }

    const eventUserExists = await Eventstousers.findAll({
      where: { user_id: userEmailExists.id },
    });

    return res.json({ eventUserExists });
  }
}

export default new EventstousersController();
