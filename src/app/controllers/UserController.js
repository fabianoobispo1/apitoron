import * as Yup from 'yup';
import User from '../models/User';

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

    const userEmailExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (userEmailExists) {
      return res
        .status(400)
        .json({ error: 'Endereço de e-mail já cadastrado.' });
    }

    const userCpfExists = await User.findOne({ where: { cpf: req.body.cpf } });

    if (userCpfExists) {
      return res.status(400).json({ error: 'Cpf já cadastrado.' });
    }

    const { id, cpf, nome, email } = await User.create(req.body);

    return res.json({ id, cpf, nome, email });
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

    const resultUser = await User.findOne({
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

    const resultUser = await User.findOne({
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
      await User.update(
        { administrador: '0' },
        {
          where: { email: req.body.email },
        }
      );
      return res.json({ res: 'Agora usuario nao e um adminisrtador' });
    }
    await User.update(
      { administrador: '1' },
      {
        where: { email: req.body.email },
      }
    );
    return res.json({ res: 'Agora usuario e um adminisrtador' });
  }
}

export default new UserController();
