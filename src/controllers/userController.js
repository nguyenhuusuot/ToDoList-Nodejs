import { StatusCodes } from 'http-status-codes'
import { asyncHandler } from '../utils/asyncHandler.js'
import { userService } from '../services/userService.js'

const register = asyncHandler(async (req, res) => {
  const result = await userService.registerService(req.body)
  res.status(StatusCodes.CREATED).json(result)
})

const login = asyncHandler(async (req, res) => {
  const result = await userService.loginService(req.body)
  const { refreshToken, ...others } = result
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true, // QUAN TRỌNG: JS không đọc được
    secure: false, // Nếu deploy lên https thì để true, localhost để false
    path: '/', // Cookie này có hiệu lực ở mọi đường dẫn
    sameSite: 'strict' //Chống tấn công CSRF
  })
  // Chỉ trả về accessToken và thông tin user cho Client
  res.status(StatusCodes.OK).json(others)

})

const refreshToken = asyncHandler(async (req, res) => {
  // Lấy token từ Cookie (nhờ thư viện cookie-parser)
  const refreshTokenFromCookie = req.cookies.refreshToken
  const result = await userService.refreshToken(refreshTokenFromCookie)
  res.status(StatusCodes.OK).json(result)
})

const logout = asyncHandler(async (req, res) => {
  // Xóa cookie
  res.clearCookie('refreshToken')
  
  const userId = req.user._id
  await userService.logout(userId)
  res.status(StatusCodes.OK).json({ message: 'Logout successfully' })
})

export const userController = {
  register,
  login,
  refreshToken,
  logout
}