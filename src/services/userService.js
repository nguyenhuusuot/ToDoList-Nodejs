import { userModel } from '../models/userModel.js'
import ApiError from '../utils/ApiError.js'
import { StatusCodes } from 'http-status-codes'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Logic Đăng ký
const registerService = async (reqBody) => {
  const { email, password } = reqBody

  // Kiểm tra email đã tồn tại chưa
  const existingUser = await userModel.findByEmail(email)
  if (existingUser) {
    throw new ApiError(StatusCodes.CONFLICT, 'Email already exists')
  }

  // Mã hóa mật khẩu (Hashing)
  const salt = await bcryptjs.genSalt(10)
  const hashedPassword = await bcryptjs.hash(password, salt)

  // Lưu vào DB
  const newUser =  {
    email: email,
    password: hashedPassword,
    createdAt: new Date()
  }

  const createUser = await userModel.createUser(newUser)
  return { message: 'User registered successfully', userId: createUser.insertedId }

}

//  Logic Đăng nhập
const loginService = async ( reqBody ) => {
  const { email, password } = reqBody

  // Tìm user theo email
  const user = await userModel.findByEmail(email)
  if (!user) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Email or password is incorrect')

  }

  // So sánh mật khẩu nhập vào vs mật khẩu trong DB
  const isMatch = await bcryptjs.compare(password, user.password)
  if (!isMatch) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Email or password is incorrect')
  }


  // Tạo Token (JWT)
  // Payload: chứa thông tin muốn lưu trong token (thường là _id và email)
  const userInfo = {
    _id: user._id,
    email: user.email
  }
  
  // TẠO ACCESS TOKEN (Ngắn hạn)
  const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFE
  })
  
  // TẠO REFRESH TOKEN (Dài hạn)
  const refreshToken = jwt.sign(userInfo, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_LIFE
  });

  // LƯU REFRESH TOKEN VÀO DB
  await userModel.updateUser(user._id, { refreshToken: refreshToken})

  return { accessToken, refreshToken, user: userInfo}
}

// Cấp lại Access Token
const refreshTokenService = async (refreshTokenClient) => {
  //  Kiểm tra xem client có gửi token lên không
  if (!refreshTokenClient) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Refresh token is required')
  }
  // Verify token (có hợp lệ, có hết hạn không?)
  let decoded
  try {
    decoded = jwt.verify(refreshTokenClient, process.env.REFRESH_TOKEN_SECRET)
  } catch (error) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'Refresh token is invalid')
  }

  // Kiểm tra token này có khớp với cái đang lưu trong DB
  const user = await userModel.findByRefreshToken(refreshTokenClient)
  if (!user) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'Refresh token is invalid')
  }

  // Tạo Access Token mới
  const userInfo = { 
    _id: user._id,
    email: user.email
  }

  const newAccessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFE
  })
  return { accessToken: newAccessToken }
}

const logout = async (userId) => {
  // Xóa refresh token trong DB đi -> Token đó sẽ vô hiệu hóa ngay lập tức
  await userModel.updateUser( userId, {refreshToken: null})
  return { message: 'Logout successfully' }
}




export const userService = {
  registerService,
  loginService,
  refreshToken: refreshTokenService,
  logout
}

