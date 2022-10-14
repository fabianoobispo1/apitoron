import * as Yup from 'yup';
import Event from '../models/Event';

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

    const eventNameExists = await Event.findOne({
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
    } = await Event.create(req.body);

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
    const listEvents = await Event.findAll();

    return res.json({ listEvents });
  }
}

export default new EventController();
