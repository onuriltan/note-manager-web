import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
) => {
  if (req.token) {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
      if (err) {
        res.sendStatus(403)
      } else {
        // @ts-ignore
        req.query.email = authData.email
        next()
      }
    })
  } else {
    res.sendStatus(403)
  }
}

export const signToken = async (user) => {
  const email = user[user.method].email
  return await new Promise((resolve, reject) => {
    jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: '10m' },
      (err, token) => {
        if (err) reject(err)
        resolve(token)
      }
    )
  })
}
