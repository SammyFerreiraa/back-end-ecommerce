import { NextFunction } from "express"
import { JwtPayload } from "jsonwebtoken"
import { UnauthorizedError } from "../helpers/api-erros"
import { userRepository } from "../repositories/userRepository"
import { Request, Response } from "express"
import jwt from 'jsonwebtoken'

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization) throw new UnauthorizedError('Unauthorized')

  const token = authorization.split(' ')[1]

  const { id } = jwt.verify(token, process.env.JWT_PASS as string) as JwtPayload

  const userExist = await userRepository.findOneBy({ id })

  if (!userExist) throw new UnauthorizedError('Unauthorized') 
  
  const {password: _, ...user } = userExist

  req.user.admin = user.admin
  if (!user.admin) throw new UnauthorizedError('Unauthorized')

  next()
}