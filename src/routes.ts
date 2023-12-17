import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { LoginController } from './controllers/LoginController'
import { ProfileController } from './controllers/ProfileController'
import { authMiddleware } from './middlewares/authMiddleware'
import { ProductsController } from './controllers/ProductsController'
import { CartController } from './controllers/CartController'

const routes = Router()

routes.post('/users', new UserController().create)
routes.post('/login', new LoginController().login)
routes.get('/products', new ProductsController().getProducts)

routes.use(authMiddleware)

routes.get('/profile', new ProfileController().getProfile)
routes.post('/products', new CartController().addToCart)

export default routes