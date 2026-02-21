import { StatusCodes } from 'http-status-codes'
import { todoService } from '../services/todoService.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const getTodos = asyncHandler(async (req, res) => {
  const userId = req.user._id

  const queryParams = {
    page: req.query.page,
    limit: req.query.limit,
    sortBy: req.query.sortBy,
    order: req.query.order,
    completed: req.query.completed
  }
  const result = await todoService.getTodoService(userId, queryParams)
  res.status(StatusCodes.OK).json(result)
})

const createTodo = asyncHandler(async (req, res) => {
  
  const userId = req.user._id
  const result = await todoService.createTodoService(userId, req.body)
  res.status(StatusCodes.CREATED).json(result)
})


const updateTodo = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params
  const result = await todoService.updateTodoService(userId, id, req.body) 
  res.status(StatusCodes.OK).json(result)
})


const deleteTodo = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params
  const result = await todoService.deleteTodoService(userId, id)
  res.status(StatusCodes.OK).json(result)
})

export const todoController = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo

}