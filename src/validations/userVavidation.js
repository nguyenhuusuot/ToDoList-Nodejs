import Joi from 'joi'

const register = Joi.object({
  email: Joi.string().email().required().trim().strict(),
  password: Joi.string().required().min(6).max(30).trim().strict(),

})

const login = Joi.object({
  email: Joi.string().email().required().trim().strict(),
  password: Joi.string().required().min(6).max(30).trim().strict(),

})

export const userValidation = {
  register,
  login,
}