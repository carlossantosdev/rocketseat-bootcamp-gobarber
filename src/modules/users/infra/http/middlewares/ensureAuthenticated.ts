import { Request, Response, NextFunction, request } from 'express'
import { verify } from 'jsonwebtoken'

import AppError from '@shared/errors/AppError'
import authConfig from '@config/auth'

interface ITokenPayload {
  iat: number
  exp: number
  sub: string
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization

  if (!authHeader) throw new AppError('JWT token is missing.', 401)

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authConfig.jwt.secretKey)
    const { sub } = decoded as ITokenPayload

    request.user = {
      id: sub
    }

    return next()
  } catch {
    throw new AppError('Invalid token', 401)
  }
}
