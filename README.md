# Advanced To-Do List RESTful API

Một hệ thống RESTful API quản lý công việc (To-Do List) hoàn chỉnh, được thiết kế theo kiến trúc **MVC**, tích hợp phân quyền bảo mật cao và sẵn sàng triển khai thực tế (Production-ready).

## Tính năng nổi bật

* **Kiến trúc Chuẩn:** Áp dụng mô hình Controller - Service - Model, giúp code dễ đọc, dễ bảo trì và dễ mở rộng.
* **Bảo mật Đa lớp (Authentication & Authorization):**
    * Mã hóa mật khẩu an toàn với `bcryptjs`.
    * Sử dụng **JWT (JSON Web Token)** để xác thực.
    * Cơ chế **Refresh Token** lưu trong **HttpOnly Cookie** chống tấn công XSS và CSRF.
    * Bảo vệ dữ liệu người dùng: "Dữ liệu của ai, người nấy quản lý".
* **Tối ưu Hiệu năng:** Hỗ trợ **Phân trang (Pagination)** và **Sắp xếp (Sorting)** dữ liệu trực tiếp từ Database.
* **Kiểm soát Dữ liệu Đầu vào:** Validate mọi request gửi lên server bằng thư viện `Joi`.
* **Xử lý Lỗi Tập trung (Centralized Error Handling):** Trả về format lỗi đồng nhất, chuyên nghiệp.
* **Container hóa:** Tích hợp sẵn `Dockerfile` và `docker-compose` để chạy dự án chỉ với 1 dòng lệnh.

## Công nghệ sử dụng

* **Runtime:** [Node.js](https://nodejs.org/)
* **Framework:** [Express.js](https://expressjs.com/)
* **Database:** [MongoDB](https://www.mongodb.com/) (Sử dụng MongoDB Native Driver)
* **Bảo mật:** `jsonwebtoken`, `bcryptjs`, `cookie-parser`
* **Tiện ích:** `joi`, `dotenv`, `http-status-codes`
* **Deploy:** Docker & Docker Compose

## Cấu trúc thư mục

\`\`\`text
src/
├── config/           # Cấu hình Database & Biến môi trường
├── controllers/      # Tiếp nhận Request và trả về Response
├── middlewares/      # Interceptor (Auth, Validation, Error Handling)
├── models/           # Định nghĩa cấu trúc Database (MongoDB Driver)
├── routes/           # Định nghĩa các endpoint (v1)
├── services/         # Xử lý logic nghiệp vụ cốt lõi
├── utils/            # Các hàm dùng chung (ApiError, asyncHandler)
└── validations/      # Định nghĩa Schema kiểm tra dữ liệu (Joi)
server.js             # Entry point của ứng dụng
\`\`\`

## Hướng dẫn cài đặt & Chạy dự án

Bạn có thể chạy dự án này bằng 2 cách: Chạy trực tiếp trên máy (Local) hoặc thông qua Docker.

### Bước 1: Chuẩn bị biến môi trường
Tạo file `.env` ở thư mục gốc và cấu hình các thông số sau:

\`\`\`env
PORT=2000
MONGODB_URI=mongodb://localhost:27017 # Đổi thành mongodb://mongodb:27017 nếu dùng Docker
DB_NAME=my_todo_project

ACCESS_TOKEN_SECRET=your_access_token_secret_here
ACCESS_TOKEN_LIFE=15m
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
REFRESH_TOKEN_LIFE=7d
\`\`\`

### Bước 2: Khởi chạy

**Cách 1: Chạy bằng Docker (Khuyên dùng)**
Yêu cầu máy tính đã cài đặt sẵn Docker và Docker Compose. Mở terminal và gõ:
\`\`\`bash
docker-compose up -d --build
\`\`\`
*Hệ thống sẽ tự động build image Node.js và kéo image MongoDB về chạy song song.*

**Cách 2: Chạy Local (Không dùng Docker)**
Yêu cầu máy tính đã cài đặt Node.js và đang bật MongoDB (Local hoặc Atlas).
\`\`\`bash
# 1. Cài đặt thư viện
npm install

# 2. Chạy server (Chế độ Dev)
npm start
\`\`\`

---

## Danh sách API (Endpoints)

| HTTP Method | Endpoint | Mô tả | Cần Token? |
| :--- | :--- | :--- | :---: |
| **POST** | `/api/v1/users/register` | Đăng ký tài khoản mới |
| **POST** | `/api/v1/users/login` | Đăng nhập & Lấy Access/Refresh Token |
| **POST** | `/api/v1/users/refresh-token` | Xin cấp lại Access Token mới (từ Cookie) |
| **POST** | `/api/v1/users/logout` | Đăng xuất & Xóa HttpOnly Cookie |
| **GET** | `/api/v1/todolist` | Lấy danh sách công việc (Hỗ trợ `?page=1&limit=10`) |
| **POST** | `/api/v1/todolist` | Tạo công việc mới |
| **PUT** | `/api/v1/todolist/:id` | Cập nhật công việc |
| **DELETE**| `/api/v1/todolist/:id` | Xóa công việc |

---
*Dự án được xây dựng với tình yêu lập trình và sự tỉ mỉ trong từng dòng code!* 
