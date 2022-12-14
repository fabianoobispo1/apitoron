import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';
import User from '../models/User';
import Loja from '../models/Loja';

class LojaController {
  async lojaList(req, res) {
    const [, token] = req.headers.authorization.split(' ');

    try {
      const decoded = await promisify(jwt.verify)(token, authConfig.secret);
      req.userId = decoded.id;

      const resultUser = await User.findOne({
        where: { id: decoded.id },
      });
      const { administrador } = resultUser.dataValues;
      if (administrador) {
        const resultLoja = await Loja.findAll();
        return res.status(200).json({ resultLoja });
      }
      return res.status(200).json({ administrador });
    } catch (err) {
      return res.status(401).json({ error: 'Token inválido.' });
    }
  }

  async cadastrarLoja(req, res) {
    const schema = Yup.object().shape({
      loja_nome: Yup.string().required(),
      loja_sigla: Yup.string().required(),
      loja_endereco: Yup.string().required(),
      loja_telefone: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro de validação, confira seus dados.' });
    }

    const lojaSiglalExists = await Loja.findOne({
      where: { loja_sigla: req.body.loja_sigla },
    });

    if (lojaSiglalExists) {
      return res.status(400).json({ error: 'Sigla da loja já cadastrado.' });
    }

    const { id } = await Loja.create(req.body);

    return res.json({ id });
  }

  async atualizaloja(req, res) {
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
          .json({ error: 'Usuario logado nao e um administrador' });
        /*     const resultAllUser = await User.findAll();
        return res.status(200).json({ resultAllUser }); */
      }
      const schema = Yup.object().shape({
        loja_nome: Yup.string().required(),
        loja_sigla: Yup.string().required(),
        loja_endereco: Yup.string().required(),
        loja_telefone: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res
          .status(400)
          .json({ error: 'Erro de validação, confira seus dados.' });
      }

      // recupera loja atual
      const lojaAtual = await Loja.findOne({
        where: { id: req.body.id },
      });

      // verifica se tem alteracao no loja_sigla
      if (lojaAtual.loja_sigla !== req.body.loja_sigla) {
        // se tiver deve verificar se ja existe
        const loja_siglaExists = await Loja.findOne({
          where: { loja_sigla: req.body.loja_sigla },
        });

        if (loja_siglaExists) {
          return res
            .status(400)
            .json({ error: 'Sigla da loja já cadastrado.' });
        }
      }
      await Loja.update(
        {
          loja_nome: req.body.loja_nome,
          loja_sigla: req.body.loja_sigla,
          loja_endereco: req.body.loja_endereco,
          loja_telefone: req.body.loja_telefone,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      );

      const teste = await Loja.findOne({ where: { id: req.body.id } });

      return res.status(200).json({ teste });
    } catch (err) {
      return res.status(401).json({ error: 'Token inválido.' });
    }
  }

  async removerloja(req, res) {
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
      const usuarioAtual = await Loja.findOne({
        where: { id: req.body.id },
      });

      if (!usuarioAtual) {
        return res.status(400).json({ error: 'Loja nao eencontrada.' });
      }

      await Loja.destroy({ where: { id: req.body.id } });

      return res.status(200).json({ Message: 'Loja removida' });
    } catch (err) {
      return res.status(401).json({ error: 'Token inválido.' });
    }
  }
}

export default new LojaController();
