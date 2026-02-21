import { StatusCodes } from 'http-status-codes'

export const errorHandLingMiddlerware = (err, req, res, next) => {
  // Nếu lỗi không có statusCode, mặc định là 500 (Lỗi Server)
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR

  // Nếu lỗi không có message, lấy message mặc định
  const message = err.message || 'Something went wrong on server'

  // Trả về cho Client
  const response = {
    statusCode: statusCode,
    error: message,
    // Chỉ hiện stack trace khi đang dev
    stack: process.env.BUILD_MODE === 'dev' ? err.stack : undefined
  }

  // Ghi log lỗi ra console server để dev thấy
  console.log(`Error: ${message}`, err)

  res.status(statusCode).json(response)

} 
