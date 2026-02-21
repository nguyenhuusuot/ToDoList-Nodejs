import { MongoClient } from 'mongodb'


const DATABASE_URI = process.env.DATABASE_URI
const DATABASE_NAME = process.env.DATABASE_NAME

const client = new MongoClient(DATABASE_URI)

let db

// Hàm kết nối DB
export const connectDB = async () => {
  try {
    await client.connect()
    db = client.db(DATABASE_NAME)
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("Error connecting to MongoDB:", error)
    throw error
  }
}
// Hàm lấy Database ra dùng ở nơi khác
export const getDB = () => {
  if (!db) {
    throw new Error("Database not connected")
  }
  return db
}

