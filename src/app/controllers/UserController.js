import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';
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

  async userInfo(req, res) {
    const [, token] = req.headers.authorization.split(' ');

    try {
      const decoded = await promisify(jwt.verify)(token, authConfig.secret);
      req.userId = decoded.id;

      const resultUser = await User.findOne({
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

  async userList(req, res) {
    const [, token] = req.headers.authorization.split(' ');

    try {
      const decoded = await promisify(jwt.verify)(token, authConfig.secret);
      req.userId = decoded.id;

      const resultUser = await User.findOne({
        where: { id: decoded.id },
      });
      const { administrador } = resultUser.dataValues;
      if (administrador) {
        const resultAllUser = await User.findAll();
        return res.status(200).json({ resultAllUser });
      }
      return res.status(200).json({ administrador });
    } catch (err) {
      return res.status(401).json({ error: 'Token inválido.' });
    }
  }

  async atualizausuario(req, res) {
    const [, token] = req.headers.authorization.split(' ');

    try {
      const decoded = await promisify(jwt.verify)(token, authConfig.secret);
      req.userId = decoded.id;

      const resultUser = await User.findOne({
        where: { id: decoded.id },
      });
      const { administrador } = resultUser.dataValues;
      if (!administrador) {
        return res
          .status(401)
          .json({ error: 'Usuario logado nao e um administradors' });
        /*     const resultAllUser = await User.findAll();
        return res.status(200).json({ resultAllUser }); */
      }
      const schema = Yup.object().shape({
        nome: Yup.string().required(),
        cpf: Yup.string().required(),
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string(),
        administrador: Yup.boolean().required(),
        id: Yup.number().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res
          .status(400)
          .json({ error: 'Erro de validação, confira seus dados.' });
      }

      // recupera usuario atual
      const usuarioAtual = await User.findOne({
        where: { id: req.body.id },
      });

      // verifica se tem alteracao no email
      if (usuarioAtual.email !== req.body.email) {
        // se tiver deve verificar se ja existe
        const userEmailExists = await User.findOne({
          where: { email: req.body.email },
        });

        if (userEmailExists) {
          return res
            .status(400)
            .json({ error: 'Endereço de e-mail já cadastrado.' });
        }
      }

      // verifica se tem alteracao no cpf
      if (usuarioAtual.cpf !== req.body.cpf) {
        // se tiver deve verificar se ja existe
        const usercpfExists = await User.findOne({
          where: { cpf: req.body.cpf },
        });

        if (usercpfExists) {
          return res.status(400).json({ error: 'CPF já cadastrado.' });
        }
      }
      // verifica se vai ter altercao na senha
      if (typeof req.body.password === 'undefined') {
        await User.update(
          {
            cpf: req.body.cpf,
            nome: req.body.nome,
            email: req.body.email,
            administrador: req.body.administrador,
          },
          {
            where: {
              id: req.body.id,
            },
          }
        );
      } else {
        // se tiver deve verificar o tamanho
        if (req.body.password !== '') {
          if (req.body.password.length < 6) {
            return res.status(400).json({ error: 'Senha invalida.' });
          }
        }

        await User.update(
          {
            cpf: req.body.cpf,
            nome: req.body.nome,
            email: req.body.email,
            administrador: req.body.administrador,
            password: req.body.password,
            password_hash: 0,
          },
          {
            where: {
              id: req.body.id,
            },
          }
        );
      }

      const teste = await User.findOne({ where: { id: req.body.id } });

      return res.status(200).json({ teste });
    } catch (err) {
      return res.status(401).json({ error: 'Token inválido.' });
    }
  }

  async removerusuario(req, res) {
    const [, token] = req.headers.authorization.split(' ');

    try {
      const decoded = await promisify(jwt.verify)(token, authConfig.secret);
      req.userId = decoded.id;

      const resultUser = await User.findOne({
        where: { id: decoded.id },
      });
      const { administrador } = resultUser.dataValues;
      if (!administrador) {
        return res
          .status(401)
          .json({ error: 'Usuario logado nao e um administradors' });
        /*     const resultAllUser = await User.findAll();
        return res.status(200).json({ resultAllUser }); */
      }
      const schema = Yup.object().shape({
        id: Yup.number().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res
          .status(400)
          .json({ error: 'Erro de validação, confira seus dados.' });
      }
      const usuarioAtual = await User.findOne({
        where: { id: req.body.id },
      });

      if (!usuarioAtual) {
        return res.status(400).json({ error: 'usuario nao eencontrado.' });
      }

      await User.destroy({ where: { id: req.body.id } });

      return res.status(200).json({ Message: 'usuario removido' });
    } catch (err) {
      return res.status(401).json({ error: 'Token inválido.' });
    }
  }
}

export default new UserController();
