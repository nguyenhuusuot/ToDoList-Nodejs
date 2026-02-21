import { StatusCodes } from 'http-status-codes'

const validateInput = (schema) => {
  return (req, res, next) => {
    // abortEarly: false để trả về TẤT CẢ lỗi sai, không dừng ở lỗi đầu tiên
    const { error } = schema.validate(req.body, { abortEarly: false })
    
    if (error) {
      const errorMessages = error.details.map((detail) => 
        detail.message
      )
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorMessages })   
    }
    
    next()
  }
}

export const validationMiddlerware = {
  validateInput
}