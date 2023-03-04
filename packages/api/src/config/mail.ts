import nodemailer from 'nodemailer'
import { logger } from '../config/pino'

const transporter = nodemailer.createTransport({
  service: 'Yandex',
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PASSWORD,
  },
})

export const sendConfirmationMail = async (
  to: string,
  confirmationToken: string
): Promise<void> => {
  const mailOptions = {
    from: '"📒 NOTE MANAGER 📒" <' + process.env.MAIL_ADDRESS + '>', // sender address
    to: to, // list of receivers
    subject: 'Welcome to Note Manager ✔', // Subject line
    text: 'Please confirm your account with this token = ' + confirmationToken, // plain text body
    html:
      '<a href=' +
      process.env.CONFIRM_EMAIL_URL +
      '/' +
      confirmationToken +
      '>Click to activate your account</a>' +
      '<p> Please note that this link will expire in 72 hours, if the link is expired, you need to register again</p>',
  }
  // send mail with defined transport object
  try {
    await transporter.sendMail(mailOptions)
    logger.info(`Confirmation email has been sent for user: ${to}`)
  } catch (e) {
    logger.error(
      `An error occurred while sending confirmation email for user ${to}`
    )
    if (e instanceof Error) {
      if (e instanceof Error) {
        logger.error(e)
      }
      throw e
    }
  }
}
