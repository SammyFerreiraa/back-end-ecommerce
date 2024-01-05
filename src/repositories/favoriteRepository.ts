import { AppDataSource } from "../data-source";
import { Favorites } from "../entities/Favorites";

export const favoriteRepository = AppDataSource.getRepository(Favorites)