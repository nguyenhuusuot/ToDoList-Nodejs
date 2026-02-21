import { ObjectId } from 'mongodb'
import { getDB } from '../config/mongodb.js'

// Tạo bảng có tên users
const USER_COLLECTION_NAME = 'users'


const getUserModel = () => {
  const db = getDB()
  return db.collection(USER_COLLECTION_NAME)
}

// Hàm tìm user theo email (Dùng khi đăng nhập/đăng ký)
const findByEmail = async (email) => {
  return await getUserModel().findOne({ email: email})
}

const createUser = async ( data ) => {
  return await getUserModel().insertOne(data)
}

const updateUser = async (userId, data) => {
  const db = getDB()
  return await db.collection(USER_COLLECTION_NAME).findOneAndUpdate(
    { _id: new ObjectId(userId)},
    { $set: data },
    { returnDocument: 'after' }
  )
}

const findByRefreshToken = async ( token ) => {
  const db = getDB()
  return await db.collection(USER_COLLECTION_NAME).findOne({ refreshToken: token })
}

export const userModel = {
  findByEmail,
  createUser,
  updateUser,
  findByRefreshToken
}