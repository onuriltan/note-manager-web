import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import {
  UserEntityInput,
  SignUpMethod,
} from '../modules/user/entity/user.entity'

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const bearerHeader = req.headers.authorization
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken
    next()
  } else {
    res.sendStatus(403)
  }
}

export const decodeToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.token) {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
      if (err) {
        res.sendStatus(403)
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        req.query.email = authData.email
        next()
      }
    })
  } else {
    res.sendStatus(403)
  }
}

export const signToken = (user: UserEntityInput): string => {
  if (user.method) {
    let email: string | undefined = ''
    switch (user.method) {
      case SignUpMethod.FACEBOOK:
        email = user.facebook?.email
        break
      case SignUpMethod.GOOGLE:
        email = user.google?.email
        break
      case SignUpMethod.LOCAL:
        email = user.local?.email
        break
      default:
    }
    return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '10m' })
  } else {
    return ''
  }
}
