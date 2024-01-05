import { AppDataSource } from "../data-source";
import { ProductFav } from "../entities/ProductFav";

export const productFavRepository = AppDataSource.getRepository(ProductFav)