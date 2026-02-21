import express from 'express'
import { userController } from '../../controllers/userController.js'
import { userValidation } from '../../validations/userVavidation.js'
import { validationMiddlerware } from '../../middlewares/validationMiddleware.js'
import { authMiddleware } from '../../middlewares/authMiddleware.js'

const Router = express.Router()

Router.route('/register')
  .post(validationMiddlerware.validateInput(userValidation.register), userController.register)

Router.route('/login')
  .post(validationMiddlerware.validateInput(userValidation.login), userController.login)

Router.route('/refresh-token')
  .post(userController.refreshToken)

Router.route('/logout')
  .post(authMiddleware, userController.logout)

export const userRouter = Router