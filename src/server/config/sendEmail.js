const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'watches.repair.quick@gmail.com',
    pass: 'watchrepair86'
  }
})

exports.sendSuccessfullyMsg = order => {
  const mailOptions = {
    from: 'watches.repair.quick@gmail.com',
    to: order.customer.email,
    subject: 'Your order has been successfully accepted.',
    text: `Respected, ${order.customer.name}! Your clock "${order.clock.typeClock}" will be repaired ${order.date} at ${order.time} o\`clock.`
  }
  transporter.sendMail(mailOptions)
  return order
}
