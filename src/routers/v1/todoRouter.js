import express from 'express'
import { todoController } from '../../controllers/todoController.js'
import { todoValidation } from '../../validations/todoValidation.js'
import { validationMiddlerware } from '../../middlewares/validationMiddleware.js'
import { authMiddleware } from '../../middlewares/authMiddleware.js'

const Router = express.Router()

Router.use(authMiddleware)

Router.route('/')
  .get(todoController.getTodos)
  .post(validationMiddlerware.validateInput(todoValidation.createNew),todoController.createTodo)

Router.route('/:id')
  .put(validationMiddlerware.validateInput(todoValidation.update), todoController.updateTodo)
  .delete(todoController.deleteTodo)


export const todoRouter = Router