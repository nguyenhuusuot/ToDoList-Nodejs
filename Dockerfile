FROM node:18-alpine

# Cài đặt thư mục làm việc bên trong container
WORKDIR /usr/src/app

# Copy package.json và package-lock.json vào trước
# Việc này giúp tận dụng cache của Docker, build sẽ nhanh hơn ở các lần sau
COPY package*.json ./

# Cài đặt các thư viện (chỉ cài dependencies, bỏ qua devDependencies để nhẹ máy)
RUN npm install --production

# Copy toàn bộ code còn lại vào container (sẽ bỏ qua những thứ trong .dockerignore)
COPY . .

# Mở cổng 2024 (hoặc cổng bạn đang dùng trong file .env)
EXPOSE 2024

# Lệnh khởi chạy ứng dụng
CMD ["npm", "start"]