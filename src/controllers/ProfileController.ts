import { Request, Response } from "express";

export class ProfileController {
  async getProfile(req: Request, res: Response) {
    return res.json(req.user)
  }
}