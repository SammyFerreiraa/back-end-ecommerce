import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { LoginController } from './controllers/LoginController'
import { ProfileController } from './controllers/ProfileController'
import { authMiddleware } from './middlewares/authMiddleware'
import { ProductsController } from './controllers/ProductsController'
import { CartController } from './controllers/CartController'
import { adminMiddleware } from './middlewares/adminMiddleware'

const routes = Router()

routes.post('/users', new UserController().create)

routes.post('/login', new LoginController().login)

routes.get('/products', new ProductsController().getProducts)

routes.get('/profile', authMiddleware, new ProfileController().getProfile)

routes.post('/cart', authMiddleware, new CartController().addToCart)
routes.delete('/cart', authMiddleware, new CartController().removeToCart)


routes.delete('/cart/removeitem', authMiddleware, new CartController().removeAllProduct)

routes.post('/cart/updatequantity', authMiddleware, new CartController().editQuantity)

routes.post('/product', authMiddleware, adminMiddleware, new ProductsController().createProduct)
routes.delete('/product', authMiddleware, adminMiddleware, new ProductsController().deleteProduct)

export default routes