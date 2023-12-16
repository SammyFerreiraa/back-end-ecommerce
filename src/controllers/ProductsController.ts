import { allProductsRepository } from "../repositories/allProductsRepository"
import { Request, Response } from "express"

export class ProductsController {
  async getProducts(req: Request, res: Response) {
    const products = await allProductsRepository.find()
    return res.json(products) 
  }
}