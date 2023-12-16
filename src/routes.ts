import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { LoginController } from './controllers/LoginController'
import { ProfileController } from './controllers/ProfileController'
import { authMiddleware } from './middlewares/authMiddleware'
import { productController } from './controllers/ProductController'

const routes = Router()

routes.post('/users', new UserController().create)
routes.post('/login', new LoginController().login)
routes.post('/products', new productController().create)
routes.get('/products', new productController().getProducts)

routes.use(authMiddleware)

routes.get('/profile', new ProfileController().getProfile)

export default routes