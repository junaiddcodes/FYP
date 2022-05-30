const nodemailer = require('nodemailer')
const config = require('config')

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: config.get('HOST'),
      service: config.get('SERVICE'),
      port: 587,
      secure: true,
      auth: {
        user: config.get('USER'),
        pass: config.get('PASS'),
      },
    })

    await transporter.sendMail({
      from: config.get('USER'),
      to: email,
      subject: subject,
      text: text,
    })

    console.log('email sent sucessfully')
  } catch (error) {
    console.log(error, 'email not sent')
  }
}

module.exports = sendEmail
