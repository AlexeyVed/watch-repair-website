const nodemailer = require('nodemailer')
const devConfig = require('../config/devConfig.js').mail
const prodConfig = require('../config/prodConfig.js').mail

const isProd = process.env.NODE_ENV || 'development'
const mailConfig = (isProd === 'production') ? prodConfig : devConfig

const transporter = nodemailer.createTransport({
  service: mailConfig.service,
  auth: {
    user: mailConfig.user,
    pass: mailConfig.pass
  }
})

exports.sendSuccessfullyMsg = order => {
  const mailOptions = {
    from: mailConfig.from,
    to: order.customer.email,
    subject: 'Your order has been successfully accepted.',
    text: `Respected, ${order.customer.name}! Your clock "${order.clock.typeClock}" will be repaired ${order.date} at ${order.time} o\`clock.`
  }
  transporter.sendMail(mailOptions)
  return order
}
