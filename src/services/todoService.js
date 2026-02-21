import { ObjectId } from 'mongodb'
import { StatusCodes } from 'http-status-codes'
import { todoModel } from '../models/todoModel.js'
import ApiError from '../utils/ApiError.js'


const getTodoService = async (userId, params) => {
  // Lấy tham số từ params (nếu không có thì lấy mặc định)
  const page = parseInt(params.page) || 1
  const limit = parseInt(params.limit) || 10
  const sortBy = params.sortBy ||  'createdAt'
  // 'asc' là tăng dần (1), mặc định là giảm dần (-1)
  const order = params.order === 'asc' ? 1 : -1
  const skip = (page - 1) * limit

  const query = { ownerId: new ObjectId(userId)}

  if (params.completed !== undefined) {
    query.completed = params.completed === 'true'
  }

  const tanks = await todoModel()
    .find(query)
    .sort({ [sortBy] : order })
    .skip(skip)
    .limit(limit)
    .toArray()

  //  Tính tổng số lượng task (để Frontend biết mà chia số trang)
  const totalCount = await todoModel().countDocuments(query)

  return {
    tanks,
    pagination: {
      page,
      limit,
      totalCount,
      totalPages: Math.ceil(totalCount / limit)
    }
  }
}

const createTodoService = async ( userId, data = {}) => {
  try {
    const { task } = data

    if (!task) {
      throw new ApiError(StatusCodes.BAD_REQUEST,'Task is required')
    }

    const newTodo = { 
      task, 
      completed: false, 
      ownerId: new ObjectId(userId),
      createdAt: new Date()
    }

    const result = await todoModel().insertOne(newTodo)
    return {result, _id: result.insertedId}
  } catch (error) {
    console.error('getTodoService error:', error)
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR,'Something went wrong' )
  }
}

const updateTodoService = async ( userId ,todoId, data) => {
  try {
    // Tạo object chứa các trường cần update
    const allowFields = ['task', 'completed']

    const updateData = {}
    
    for (const field of allowFields) {
      if (data[field] !== undefined) {
        updateData[field] = data[field]
      }
    }

    if (Object.keys(updateData).length === 0) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'No fields to update' )
    }

    const result = await todoModel().updateOne(
      { _id: new ObjectId(todoId),
        ownerId: new ObjectId(userId)
      },
      { $set: updateData}
    )

    if (result.matchedCount === 0) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Todo not found')
    }

    return result
  } catch (error) {
    throw error
  }
  }

const deleteTodoService = async ( userId, todoId) => {
  try {
    const result = await todoModel().deleteOne(
      { _id: new ObjectId(todoId),
        ownerId: new ObjectId(userId)
      }
    )
    if (result.deletedCount === 0) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Todo not found')
    }
    return result
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR,'Something went wrong')
  }
  }

export const todoService = {
  getTodoService,
  createTodoService,
  updateTodoService,
  deleteTodoService,

}
