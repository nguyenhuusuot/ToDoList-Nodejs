export const asyncHandler = (fn) => {
  // Trả về 1 middleware function của Express
  return (req, res, next) => {
    // Chạy hàm fn, nếu có lỗi thì tự động gọi next(error)
    fn(req, res, next).catch(next)
  }
}