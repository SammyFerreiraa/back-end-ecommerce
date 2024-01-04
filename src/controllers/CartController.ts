import { Request, Response } from "express";
import { productRepository } from "../repositories/productsRepository";
import { BadRequestError } from "../helpers/api-erros";
import { cartRepository } from "../repositories/cartRepository";
import { allProductsRepository } from "../repositories/allProductsRepository";

export class CartController {
  async addToCart(req: Request, res: Response) {
    if (!req.user) {
      throw new BadRequestError("User not found");
    }
  
    const { cartId, productCode } = req.body;
  
    const product = await allProductsRepository.findOneBy({ code: productCode });
    if (!product) {
      throw new BadRequestError("Product not found");
    }
  
    if (product.availableQuantity <= 0) {
      throw new BadRequestError("Product not available");
    }
    product.availableQuantity -= 1;
    await allProductsRepository.save(product);
  
    const cart = await cartRepository.findOneBy({ id: cartId });
    if (!cart) {
      throw new BadRequestError("Cart not found");
    }
  
    const productCart = cart.products.find(item => item.code === product.code);
    if (productCart) {
      productCart.quantity ++;
      await productRepository.save(productCart);
      return res.status(200).send('Product existing added to cart').end();
    }
  
    const newProduct = await productRepository.create({
      ...product,
      quantity: 1,
      cart
    });
    await productRepository.save(newProduct);
  
    cart.products.push(newProduct);
  
    await cartRepository.save(cart);
  
    return res.status(200).send('Product added to cart').end();
  }

  async removeAll(req: Request, res: Response) {
    const { cartId } = req.body

    const cartUsed = await cartRepository.findOneBy({ id: cartId })
    if (!cartUsed) throw new BadRequestError("Cart not found")

    for (let i = 0; i < cartUsed.products.length; i++) {
      const product = await allProductsRepository.findOneBy({ code: cartUsed.products[i].code })
      if (!product) throw new BadRequestError("Product not found")
      product.availableQuantity += cartUsed.products[i].quantity
      await allProductsRepository.save(product)
    }

    cartUsed.products = []
    await cartRepository.save(cartUsed)

    return res.status(200).send('Cart emptied').end()
  }

  async removeAllProduct(req: Request, res: Response) {
    const { productCode } = req.body

    const product = await allProductsRepository.findOneBy({ code: productCode })
    if (!product) throw new BadRequestError("Product not found")
    
    const deletedProduct = await productRepository.findOneBy({ code: productCode })
    if (!deletedProduct) throw new BadRequestError("Product not found")

    product.availableQuantity += deletedProduct.quantity
    await allProductsRepository.save(product)

    await productRepository.delete(deletedProduct.id)

    return res.status(200).send('Product removed from cart').end()
  }

  async editQuantity(req: Request, res: Response) {
    const { productCode } = req.body
    const { quantity } = req.body

    const product = await allProductsRepository.findOneBy({ code: productCode })
    if (!product) throw new BadRequestError("Product not found")

    const productCart = await productRepository.findOneBy({ code: productCode })
    if (!productCart) throw new BadRequestError("Product not found")

    if (quantity > product.availableQuantity) throw new BadRequestError("Quantity not available")

    product.availableQuantity -= quantity - productCart.quantity
    await allProductsRepository.save(product)

    productCart.quantity = quantity
    await productRepository.save(productCart)
    return res.status(200).send('Quantity updated').end()
  }
}