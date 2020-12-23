import * as userRepository from '../../repository/user'
import { Request, Response } from 'express'

export const getUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email } = req.query
  if (email && typeof email === 'string') {
    const userProfile = await userRepository.getUser(email)
    if (userProfile !== null) {
      return res.send(userProfile)
    } else {
      return res.status(404).send()
    }
  } else {
    return res.status(404).send()
  }
}

export const changePassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email } = req.query
  const { oldPassword, newPassword } = req.body
  if (email && typeof email === 'string') {
    const isPasswordChanged = await userRepository.changePassword(
      email,
      oldPassword,
      newPassword
    )
    if (isPasswordChanged) {
      return res.status(200).send()
    } else {
      return res.status(400).json({
        fieldErrors: {
          oldPassword: 'Password is wrong',
          newPassword: '',
        },
      })
    }
  } else {
    return res.status(404).send()
  }
}
