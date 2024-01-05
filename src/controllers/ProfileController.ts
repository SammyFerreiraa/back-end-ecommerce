import { Request, Response } from "express";

export class ProfileController {
  async getProfile(req: Request, res: Response) {
    if (!req.user) return res.sendStatus(401).send('Unauthorized')
    return res.json(req.user)
  }
}