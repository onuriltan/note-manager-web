import * as mail from '../../../../config/mail'
import { logger } from '../../../../config/pino'
import { AppUser } from '../../entity/user.entity'

export const sendConfirmationMail = async (user: AppUser): Promise<boolean> => {
  if (user?.local?.email && user.confirmationToken) {
    try {
      await mail.sendConfirmationMail(
        user?.local?.email,
        user.confirmationToken
      )
      logger.info(
        `Confirmation email has been sent for user: ${user.local.email}`
      )
      return true
    } catch (e) {
      logger.error(
        `An error occurred while sending confirmation email for user ${user.local.email}`
      )
      return false
    }
  }
  return false
}
