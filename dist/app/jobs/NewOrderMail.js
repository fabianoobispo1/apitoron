"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Mail = require('../../lib/Mail'); var _Mail2 = _interopRequireDefault(_Mail);

class NewOrderMail {
  get key() {
    return 'NewOrderMail';
  }

  async handle({ data }) {
    const { deliveryman, product, order } = data;

    await _Mail2.default.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Você tem uma nova entrega!',
      template: 'newOrder',
      context: {
        deliveryman: deliveryman.name,
        product,
        recipient: order.recipient.name,
        street: order.recipient.street,
        number: order.recipient.number,
        complement: order.recipient.complement,
        state: order.recipient.state,
        city: order.recipient.city,
        cep: order.recipient.cep,
      },
    });
  }
}

exports. default = new NewOrderMail();
