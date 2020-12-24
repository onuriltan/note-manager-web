import * as mail from '../../../../config/mail'
import { logger } from '../../../../config/pino'
import { SignUpMethod, UserEntityInput } from '../../entity/user.entity'
import { sendConfirmationMail } from './auth.service'

jest.mock('../../../../config/mail')
jest.mock('../../../../config/pino')

describe('authService tests', () => {
  const user: UserEntityInput = {
    active: true,
    method: SignUpMethod.LOCAL,
    local: {
      email: 'user@gmail.com',
      password: '123',
    },
    confirmationToken: 'confirmationToken',
  }

  beforeEach(() => {
    logger.info = jest.fn()
    logger.error = jest.fn()
  })

  it(`should send confirmation mail with necessary parameteres from user object`, async () => {
    // Arrange
    jest.spyOn(mail, 'sendConfirmationMail').mockResolvedValue()

    // Act
    await sendConfirmationMail(user)

    // Assert
    expect(mail.sendConfirmationMail).toHaveBeenCalledWith(
      user?.local?.email,
      user.confirmationToken
    )
  })

  it(`should log error if sendConfirmationMail fails`, async () => {
    // Arrange
    jest.spyOn(mail, 'sendConfirmationMail').mockRejectedValue('fail')

    // Act
    await sendConfirmationMail(user)

    // Assert
    expect(mail.sendConfirmationMail).toHaveBeenCalledWith(
      user?.local?.email,
      user.confirmationToken
    )
  })
})
