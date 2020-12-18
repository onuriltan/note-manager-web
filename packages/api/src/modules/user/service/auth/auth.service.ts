import * as mail from '../../../../config/mail'
import { logger } from '../../../../config/pino'

export const sendConfirmationMail = async (user) => {
  let isSent = false
  try {
    await mail.sendConfirmationMail(user.local.email, user.confirmationToken)
    isSent = true
    logger.info(
      `Confirmation email has been sent for user:  ${user.local.email}`
    )
  } catch (e) {
    logger.error(
      `An error occurred while sending confirmation email for user ${user.local.email}`
    )
  }
  return isSent
}
