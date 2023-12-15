import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { LoginController } from './controllers/LoginController'
import { ProfileController } from './controllers/ProfileController'

const routes = Router()

routes.post('/users', new UserController().create)
routes.post('/login', new LoginController().login)
routes.get('/profile', new ProfileController().getProfile)

export default routes