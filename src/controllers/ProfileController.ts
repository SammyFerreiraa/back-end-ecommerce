import { Request, Response } from "express";
import { UnauthorizedError } from "../helpers/api-erros";
import jwt from 'jsonwebtoken'
import { userRepository } from "../repositories/userRepository";

interface JwtPayload {
  id: string
}

export class ProfileController {
  async getProfile(req: Request, res: Response) {
    const { authorization } = req.headers

    if (!authorization) throw new UnauthorizedError('Unauthorized')

    const token = authorization.split(' ')[1]

    const { id } = jwt.verify(token, process.env.JWT_PASS as string) as JwtPayload

    const userExist = await userRepository.findOneBy({ id: Number(id) })

    if (!userExist) throw new UnauthorizedError('Unauthorized') 
    
    const {password: _, ...user } = userExist

    return res.status(200).json(user)
  }
}