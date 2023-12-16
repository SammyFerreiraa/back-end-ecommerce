import { AppDataSource } from "../data-source";
import { AllProducts } from "../entities/AllProducts";

export const allProductsRepository = AppDataSource.getRepository(AllProducts)