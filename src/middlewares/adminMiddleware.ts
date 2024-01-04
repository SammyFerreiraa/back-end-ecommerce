import { NextFunction } from "express"
import { UnauthorizedError } from "../helpers/api-erros"
import { Request, Response } from "express"


export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user.admin) throw new UnauthorizedError('Unauthorized')
  
  next()
}