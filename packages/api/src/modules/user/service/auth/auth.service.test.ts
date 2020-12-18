import * as mail from '../../../../config/mail'
import { logger } from '../../../../config/pino'
import { sendConfirmationMail } from './auth.service'

jest.mock('../../../../config/mail')
jest.mock('../../../../config/pino')

describe('authService tests', () => {
  const user = {
    local: {
      email: 'user@gmail.com',
    },
    confirmationToken: 'confirmationToken',
  }

  beforeEach(() => {
    logger.info = jest.fn()
    logger.error = jest.fn()
  })
  it(`should send confirmation mail with necessary parameteres from user object`, async () => {
    // Arrange
    jest.spyOn(mail, 'sendConfirmationMail').mockResolvedValue(true)

    // Act
    await sendConfirmationMail(user)
    // Assert

    expect(mail.sendConfirmationMail).toHaveBeenCalledWith(
      user.local.email,
      user.confirmationToken
    )
    expect(logger.info).toHaveBeenCalledWith(
      `Confirmation email has been sent for user:  ${user.local.email}`
    )
  })

  it(`should log error if sendConfirmationMail fails`, async () => {
    // Arrange
    jest.spyOn(mail, 'sendConfirmationMail').mockRejectedValue(false)

    // Act
    await sendConfirmationMail(user)

    // Assert
    expect(mail.sendConfirmationMail).toHaveBeenCalledWith(
      user.local.email,
      user.confirmationToken
    )
    expect(logger.error).toHaveBeenCalledWith(
      `An error occurred while sending confirmation email for user ${user.local.email}`
    )
  })
})
