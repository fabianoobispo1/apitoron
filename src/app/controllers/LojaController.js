import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';
import User from '../models/User';
import Loja from '../models/lojas';

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
}

export default new LojaController();
