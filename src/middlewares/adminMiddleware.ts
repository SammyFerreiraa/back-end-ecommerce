import { NextFunction } from "express"
import { JwtPayload } from "jsonwebtoken"
import { UnauthorizedError } from "../helpers/api-erros"
import { userRepository } from "../repositories/userRepository"
import { Request, Response } from "express"
import jwt from 'jsonwebtoken'

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user.admin) throw new UnauthorizedError('Unauthorized')
  
  next()
}