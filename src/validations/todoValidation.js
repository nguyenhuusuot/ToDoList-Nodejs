import Joi from 'joi'

const createNew = Joi.object({
  task: Joi.string().min(3).max(200).required().trim().strict().messages({
    'string.min': 'Task must be at least 3 characters long',
    'string.max': 'Task must be at most 200 characters long',
    'any.required': 'Task is required',
  }),
  completed: Joi.boolean().default(false)
})
  
const update = Joi.object({
  task: Joi.string().min(3).max(200).trim().strict(),
  completed: Joi.boolean()
})

export const todoValidation = {
  createNew,
  update
}