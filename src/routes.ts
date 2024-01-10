import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { LoginController } from './controllers/LoginController'
import { ProfileController } from './controllers/ProfileController'
import { authMiddleware } from './middlewares/authMiddleware'
import { ProductsController } from './controllers/ProductsController'
import { CartController } from './controllers/CartController'
import { adminMiddleware } from './middlewares/adminMiddleware'
import { FavController } from './controllers/FavController'

const routes = Router()

routes.post('/users', new UserController().create)

routes.post('/login', new LoginController().login)

routes.get('/products', new ProductsController().getProducts)
routes.post('/products', new ProductsController().getProduct)
routes.post('/category', new ProductsController().getCategory)

routes.get('/profile', authMiddleware, new ProfileController().getProfile)

routes.post('/cart', authMiddleware, new CartController().addToCart)
routes.post('/favorites', authMiddleware, new FavController().addFavorite)
routes.delete('/cart', authMiddleware, new CartController().removeAll)
routes.delete('/favorites', authMiddleware, new FavController().removeFavorite)

routes.delete('/cart/remove', authMiddleware, new CartController().removeOneProduct)
routes.delete('/cart/remove/item', authMiddleware, new CartController().removeAllProduct)

routes.post('/cart/update/quantity', authMiddleware, new CartController().editQuantity)

routes.post('/product', authMiddleware, adminMiddleware, new ProductsController().createProduct)
routes.delete('/product', authMiddleware, adminMiddleware, new ProductsController().deleteProduct)

export default routes