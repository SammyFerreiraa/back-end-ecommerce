import { Request, Response } from "express";
import { productRepository } from "../repositories/productsRepository";
import { BadRequestError } from "../helpers/api-erros";
import { cartRepository } from "../repositories/cartRepository";
import { allProductsRepository } from "../repositories/allProductsRepository";

export class CartController {
  async addToCart(req: Request, res: Response) {
    if (!req.user) throw new BadRequestError("User not found")

    const { cartId } = req.body
    const { productCode } = req.body

    const product = await allProductsRepository.findOneBy({ code: productCode })
    if (!product) throw new BadRequestError("Product not found")

    if (product.availableQuantity <= 0) throw new BadRequestError("Product not available")
    product.availableQuantity -= 1
    await allProductsRepository.save(product)

    const cart = await cartRepository.findOneBy({ id: cartId })
    if (!cart) throw new BadRequestError("Cart not found")

    if (cart.products.find(products => products.code === product.code)) {
      const productCart = await productRepository.findOneBy({ code: product.code })
      if (!productCart) throw new BadRequestError("Product not found")

      productCart.quantity += 1
      await productRepository.save(productCart)
      return res.status(200).send('Product added to cart')
    }

    const ProductAdd = await productRepository.create({
      name: product.name,
      price: product.price,
      description: product.description,
      quantity: 1,
      code: product.code,
      category: product.category,
      image: product.image,
      featured: product.featured,
      cart
    })
    await productRepository.save(ProductAdd)

    cart.products.push(ProductAdd)

    await cartRepository.save(cart)

    return res.status(200).send('Product added to cart')
  }

  async removeToCart(req: Request, res: Response) {
    if (!req.user) throw new BadRequestError("User not found")

    const { cartId } = req.body
    const { productCode } = req.body

    const cart = await cartRepository.findOneBy({ id: cartId })
    if (!cart) throw new BadRequestError("Cart not found")

    const productDeleted = await productRepository.findOneBy({ code: productCode })
    if (!productDeleted) throw new BadRequestError("Product not found")

    const product = await allProductsRepository.findOneBy({ code: productCode })
    if (!product) throw new BadRequestError("Product not found")

    if (productDeleted.quantity <= 1) {
      await productRepository.delete(productDeleted.id)
      product.availableQuantity += 1
      await allProductsRepository.save(product)
      return res.status(200).send('Product removed from cart')
    }

    productDeleted.quantity -= 1
    await productRepository.save(productDeleted)

    product.availableQuantity += 1
    await allProductsRepository.save(product)

    return res.status(200).send('Product removed from cart')
  }
}