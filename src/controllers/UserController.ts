import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { BadRequestError } from "../helpers/api-erros";
import bcrypt from 'bcrypt'
import { cartRepository } from "../repositories/cartRepository";

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body

    const userExists = await userRepository.findOne({ where: { email } })

    if (userExists) throw new BadRequestError('Email already exists')

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = userRepository.create({
      name,
      email,
      password: hashPassword
    })
    await userRepository.save(newUser)

    const newCart = cartRepository.create({ user: newUser });
    await cartRepository.save(newCart);

    newUser.cart = newCart;
    await userRepository.save(newUser);

    const { password: _, cart,  ...user } = newUser

    return res.status(201).json(user)
  }
}