const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      connectionTimeout: 10000,
    })

    let info = await transporter.sendMail({
      from: `"GyanSetu | Bharat Rathod" <${process.env.MAIL_USER}>`, // sender address
      to: `${email}`, // list of receivers
      subject: `${title}`, // Subject line
      html: `${body}`, // html body
    })
    console.log("Mail sent:", info.response)
    return info
  } catch (error) {
    console.log("MAIL SENDER ERROR:", error)
    throw error
  }
}

module.exports = mailSender