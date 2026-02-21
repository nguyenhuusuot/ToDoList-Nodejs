import 'dotenv/config'
import express from 'express'
import { connectDB } from './src/config/mongodb.js'
import { todoRouter } from './src/routers/v1/todoRouter.js'
import { userRouter } from './src/routers/v1/userRouter.js'
import { errorHandLingMiddlerware } from './src/middlewares/errorHandLingMiddlerware.js'
import cookieParser from 'cookie-parser'


const app = express()
const PORT = process.env.PORT
app.use(express.json())
app.use(cookieParser())

// Các Route API user
app.use('/api/v1/user', userRouter )

// Các Route API todolist
app.use('/api/v1/todolist', todoRouter)

// Middleware xử lý lỗi nằm dưới cùng
app.use(errorHandLingMiddlerware)

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error(err)
    process.exit(1) // Dừng app nếu lỗi DB
  })
