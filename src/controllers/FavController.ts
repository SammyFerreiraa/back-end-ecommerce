import { BadRequestError } from "../helpers/api-erros";
import { allProductsRepository } from "../repositories/allProductsRepository";
import { cartRepository } from "../repositories/cartRepository";
import { productFavRepository } from "../repositories/favProductsRepository";
import { favoriteRepository } from "../repositories/favoriteRepository";
import { productRepository } from "../repositories/productsRepository";

export class FavController {
  async addFavorite(req: any, res: any) {
    const { favoriteId, productCode } = req.body;
  
    const product = await allProductsRepository.findOneBy({ code: productCode });
    if (!product) {
      throw new BadRequestError("Product not found");
    }

    const favorites = await favoriteRepository.findOneBy({ id: favoriteId });
    if (!favorites) {
      throw new BadRequestError("Cart not found");
    }

    if( favorites.products.find((item: any) => item.code === product.code)) throw new BadRequestError("Product already added to fav");

    const productAdded = await productFavRepository.create({
      ...product,
      favorites
    })

    await productFavRepository.save(productAdded);

    favorites.products.push(productAdded);
    await favoriteRepository.save(favorites);
    return res.status(200).send('Product added to favorite').end();
  }
}