const nodemailer = require('nodemailer')
const config = require('../config/config.js')

const transporter = nodemailer.createTransport({
  service: config.mail.service,
  auth: {
    user: config.mail.user,
    pass: config.mail.pass
  }
})

exports.sendSuccessfullyMsg = order => {
  const mailOptions = {
    from: config.mail.from,
    to: order.customer.email,
    subject: 'Your order has been successfully accepted.',
    text: `Respected, ${order.customer.name}! Your clock "${order.clock.typeClock}" will be repaired ${order.date} at ${order.time} o\`clock.`
  }
  transporter.sendMail(mailOptions)
  return order
}
