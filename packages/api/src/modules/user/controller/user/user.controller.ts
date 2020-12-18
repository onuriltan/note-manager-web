import * as userRepository from '../../repository/user'
import { Request, Response } from 'express'

export const getUser = async (req: Request, res: Response) => {
  const { email } = req.query
  const userProfile = await userRepository.getUser(email)
  if (userProfile !== null) {
    res.send(userProfile)
  } else {
    res.status(404).send()
  }
}

export const changePassword = async (req: Request, res: Response) => {
  const { email } = req.query
  const { oldPassword, newPassword } = req.body

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
}
