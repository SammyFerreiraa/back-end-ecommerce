import { UnauthorizedError } from "../helpers/api-erros"
import { allProductsRepository } from "../repositories/allProductsRepository"
import { Request, Response } from "express"

export class ProductsController {
  async getProducts(req: Request, res: Response) {
    const products = await allProductsRepository.find()
    return res.json(products) 
  }

  async createProduct (req: Request, res: Response) {
    const { name, price, description, availableQuantity, featured, category, image, code } = req.body
    const product = allProductsRepository.create({ name, price, description, availableQuantity, featured, category, image, code })
    await allProductsRepository.save(product)
    return res.status(201).json(product)
  }
}