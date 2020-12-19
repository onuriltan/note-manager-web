import * as userRepository from '../../repository/user'
import { Request, Response } from 'express'

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.query
  if (email && typeof email === 'string') {
    const userProfile = await userRepository.getUser(email)
    if (userProfile !== null) {
      res.send(userProfile)
    } else {
      res.status(404).send()
    }
  } else {
    res.status(404).send()
  }
}

export const changePassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.query
  const { oldPassword, newPassword } = req.body
  if (email && typeof email === 'string') {
    const isPasswordChanged = await userRepository.changePassword(
      email,
      oldPassword,
      newPassword
    )
    if (isPasswordChanged) {
      res.status(200).send()
    } else {
      res.status(400).json({
        fieldErrors: {
          oldPassword: 'Password is wrong',
          newPassword: '',
        },
      })
    }
  } else {
    res.status(404).send()
  }
}
