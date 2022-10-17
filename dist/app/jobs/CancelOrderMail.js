"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Mail = require('../../lib/Mail'); var _Mail2 = _interopRequireDefault(_Mail);

class CancelOrderMail {
  get key() {
    return 'CancelOrderMail';
  }

  async handle({ data }) {
    const { order, deliveryProblem } = data;

    await _Mail2.default.sendMail({
      to: `${order.deliveryman.name} <${order.deliveryman.email}>`,
      subject: 'Uma entrega foi cancelada',
      template: 'cancelOrder',
      context: {
        name: order.deliveryman.name,
        recipient: order.recipient.name,
        product: order.product,
        description: deliveryProblem.description,
      },
    });
  }
}

exports. default = new CancelOrderMail();
