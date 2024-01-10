import { BadRequestError, UnauthorizedError } from "../helpers/api-erros"
import { allProductsRepository } from "../repositories/allProductsRepository"
import { Request, Response } from "express"

export class ProductsController {
  async getProducts(req: Request, res: Response) {
    const products = await allProductsRepository.find()
    return res.json(products) 
  }

  async getProduct (req: Request, res: Response) {
    const { code } = req.body
    const product = await allProductsRepository.findOneBy({ code })
    if (!product) throw new BadRequestError('Product not found')
    return res.json(product)
  }

  async getCategory (req: Request, res: Response) {
    const { category } = req.body
    const products = await allProductsRepository.findBy({ category })
    if (!products) throw new BadRequestError('Product not found')
    return res.json(products)
  }

  async createProduct (req: Request, res: Response) {
    const { name, price, description, availableQuantity, featured, category, image, code, discount, offer } = req.body

    const existingProduct = await allProductsRepository.findOneBy({ code })
    if (existingProduct) throw new BadRequestError('Product already exists')

    const product = allProductsRepository.create({ name, price, description, availableQuantity, featured, category, image, code, discount, offer })
    await allProductsRepository.save(product)
    return res.status(201).send('Criado com sucesso!')
  }

  async deleteProduct (req: Request, res: Response) {
    const { code } = req.body
    const product = await allProductsRepository.findOneBy({ code })
    if (!product) throw new BadRequestError('Product not found')
    await allProductsRepository.delete({ code })
    return res.status(200).send('Deletado com sucesso!')
  }
}