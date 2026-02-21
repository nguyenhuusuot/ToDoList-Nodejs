import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import ApiError from '../utils/ApiError.js'

export const authMiddleware = (req, res, next) => {
  // Lấy token từ header gửi lên
  // Client gửi: "Bearer <token_string>" -> Mình cần tách chữ "Bearer" ra
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not logged in')

  }

  try {
    // Giải mã Token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    // Gắn thông tin user (đã giải mã) vào request để dùng ở Controller
    req.user = decoded

    next() // Cho phép đi tiếp
  } catch (error) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Token is invalid')
  }


}