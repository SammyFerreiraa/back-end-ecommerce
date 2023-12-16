import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../helpers/api-erros";
import { userRepository } from "../repositories/userRepository";
import jwt from 'jsonwebtoken'

interface JwtPayload {
  id: string
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

    if (!authorization) throw new UnauthorizedError('Unauthorized')

    const token = authorization.split(' ')[1]

    const { id } = jwt.verify(token, process.env.JWT_PASS as string) as JwtPayload

    const userExist = await userRepository.findOneBy({ id })

    if (!userExist) throw new UnauthorizedError('Unauthorized') 
    
    const {password: _, ...user } = userExist

    req.user = user

    next()
}