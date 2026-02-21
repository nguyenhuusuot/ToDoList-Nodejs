class ApiError extends Error {
  constructor(statusCode, message) { 
    // Gọi constructor của class cha (Error) để gán message 
    super(message)

    // Gán thêm statusCode (ví dụ: 404, 400, 401)
    this.statusCode = statusCode

    // Ghi lại Stack Trace (dấu vết lỗi) để dễ debug
    Error.captureStackTrace(this, this.constructor)
  }
}

export default ApiError