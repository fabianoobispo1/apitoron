import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';
import User from '../models/User';
import Cliente from '../models/Cliente';

class ClienteController {
  async Clienteslist(req, res) {
    const resultClientes = await Cliente.findAll();
    return res.status(200).json({ resultClientes });
  }

  async cadastrarCliente(req, res) {
    const schema = Yup.object().shape({
      cliente_nome: Yup.string().required(),
      cliente_telefone: Yup.string().required(),
      cliente_data_nascimento: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro de validação, confira seus dados.' });
    }

    const clienteTelefoneExists = await Cliente.findOne({
      where: { cliente_telefone: req.body.cliente_telefone },
    });

    if (clienteTelefoneExists) {
      return res
        .status(400)
        .json({ error: 'Telefone de CLiente já cadastrado.' });
    }

    const { id } = await Cliente.create(req.body);

    return res.json({ id });
  }

  async atualizaCliente(req, res) {
    const schema = Yup.object().shape({
      cliente_nome: Yup.string().required(),
      cliente_telefone: Yup.string().required(),
      cliente_data_nascimento: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro de validação, confira seus dados.' });
    }

    const clienteAtual = await Cliente.findOne({
      where: { id: req.body.id },
    });

    if (clienteAtual) {
      if (req.body.cliente_telefone === clienteAtual.cliente_telefone) {
        await Cliente.update(
          {
            cliente_nome: req.body.cliente_nome,
            cliente_data_nascimento: req.body.cliente_data_nascimento,
          },
          {
            where: {
              id: req.body.id,
            },
          }
        );
      } else {
        const clientetelefoneexist = await Cliente.findOne({
          where: { cliente_telefone: req.body.cliente_telefone },
        });

        if (clientetelefoneexist) {
          return res
            .status(400)
            .json({ error: 'Telefone de Cliente ja cadastrado.' });
        }

        await Cliente.update(
          {
            cliente_nome: req.body.cliente_nome,
            cliente_telefone: req.body.cliente_telefone,
            cliente_data_nascimento: req.body.cliente_data_nascimento,
          },
          {
            where: {
              id: req.body.id,
            },
          }
        );
      }
    } else {
      return res.status(400).json({ error: 'Cliente não encontrado .' });
    }
    const teste = await Cliente.findOne({ where: { id: req.body.id } });

    return res.status(200).json({ teste });
  }

  async removerCliente(req, res) {
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
      const clienteAtual = await Cliente.findOne({
        where: { id: req.body.id },
      });

      if (!clienteAtual) {
        return res.status(400).json({ error: 'Cliente nao eencontrada.' });
      }

      await Cliente.destroy({ where: { id: req.body.id } });

      return res.status(200).json({ Message: 'Cliente removido' });
    } catch (err) {
      return res.status(401).json({ error: 'Token inválido.' });
    }
  }

  async buscarClienteTelefone(req, res) {
    const schema = Yup.object().shape({
      cliente_telefone: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro de validação, confira seus dados.' });
    }

    const cliente = await Cliente.findAll({
      where: { cliente_telefone: req.body.cliente_telefone },
    });

    return res.status(200).json({ cliente });
  }
}

export default new ClienteController();
