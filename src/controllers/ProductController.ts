import { Request, Response } from "express";
import { productRepository } from "../repositories/productsRepository";
import { BadRequestError } from "../helpers/api-erros";

export class productController {
  async create(req: Request, res: Response) {
    const { name, price, description, availableQuantity, category, image, featured } = req.body

    const productExist = await productRepository.findOne({ where: { name } })

    if (productExist) throw new BadRequestError('Product already exists')
    
    const newProduct = productRepository.create({
      name,
      price,
      description,
      availableQuantity,
      category,
      image,
      featured
    })

    await productRepository.save(newProduct)

    return res.status(201).json(newProduct)
  }

  async getProducts(req: Request, res: Response) {
    const products = await productRepository.find()

    return res.status(200).json(products)
  }
}