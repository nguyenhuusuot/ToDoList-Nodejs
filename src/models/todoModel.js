import { getDB } from "../config/mongodb.js";

const TODO_COLLECTION_NAME = 'tasks'

// Hàm lấy Collection tasks
export const todoModel =  () => {
  return getDB().collection(TODO_COLLECTION_NAME)
}