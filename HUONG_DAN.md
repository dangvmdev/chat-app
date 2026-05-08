# 🚀 HƯỚNG DẪN CÀI ĐẶT VÀ SỬ DỤNG CHAT APP

## 📋 Yêu cầu hệ thống

- Node.js phiên bản 18.0 trở lên
- npm hoặc yarn
- Trình duyệt hiện đại (Chrome, Firefox, Edge, Safari)
- Camera và Microphone (cho tính năng gọi video/thoại)

## 🔧 Cài đặt

### Bước 1: Cài đặt Node.js packages

Mở terminal/command prompt trong thư mục dự án và chạy:

```bash
npm install
```

Lệnh này sẽ cài đặt tất cả các thư viện cần thiết:
- Next.js 14
- React 18
- Socket.io (server & client)
- Simple-peer (WebRTC)
- Zustand (state management)
- Tailwind CSS
- Lucide React (icons)
- TypeScript

### Bước 2: Chạy ứng dụng

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: **http://localhost:3000**

## 🎮 Hướng dẫn sử dụng chi tiết

### 1️⃣ Đăng nhập vào hệ thống

1. Mở trình duyệt và truy cập `http://localhost:3000`
2. Bạn sẽ thấy màn hình đăng nhập với:
   - Logo Chat App 💬
   - Ô nhập tên
   - Nút "Bắt đầu chat"
3. Nhập tên của bạn (ví dụ: "Nguyễn Văn A")
4. Nhấn nút "Bắt đầu chat"

### 2️⃣ Giao diện chính

Sau khi đăng nhập, bạn sẽ thấy:

**Header (Phía trên):**
- Logo và tên ứng dụng
- Tên của bạn
- Nút "Đăng xuất"

**Bên trái:**
- Danh sách người dùng đang online
- Mỗi người dùng có:
  - Avatar với chữ cái đầu
  - Tên
  - Trạng thái "Đang online"
  - Nút gọi thoại 📞
  - Nút gọi video 📹

**Bên phải (Khu vực chat):**
- Danh sách tin nhắn
- Ô nhập tin nhắn ở dưới cùng
- Nút "Gửi"

### 3️⃣ Nhắn tin

**Gửi tin nhắn:**
1. Nhập nội dung vào ô "Nhập tin nhắn..."
2. Nhấn nút "Gửi" hoặc phím Enter
3. Tin nhắn sẽ hiển thị ngay lập tức

**Phân biệt tin nhắn:**
- Tin nhắn của bạn: Màu xanh/tím, nằm bên phải
- Tin nhắn người khác: Màu xám, nằm bên trái
- Tin nhắn hệ thống: Màu xám nhạt, ở giữa

### 4️⃣ Gọi thoại

**Thực hiện cuộc gọi:**
1. Tìm người dùng trong danh sách bên trái
2. Nhấn nút 📞 (màu xanh)
3. Trình duyệt sẽ yêu cầu quyền truy cập microphone
4. Nhấn "Cho phép"
5. Đợi người kia chấp nhận cuộc gọi

**Nhận cuộc gọi:**
1. Khi có cuộc gọi đến, sẽ hiện popup
2. Thấy tên người gọi và loại cuộc gọi
3. Nhấn "Chấp nhận" để bắt đầu
4. Nhấn "Từ chối" để từ chối

**Trong cuộc gọi:**
- Nhấn nút 🎤 để tắt/bật microphone
- Nhấn nút ❌ để kết thúc cuộc gọi

### 5️⃣ Gọi video

**Thực hiện cuộc gọi video:**
1. Tìm người dùng trong danh sách
2. Nhấn nút 📹 (màu tím)
3. Cho phép truy cập camera và microphone
4. Đợi người kia chấp nhận

**Trong cuộc gọi video:**
- Video người kia: Toàn màn hình
- Video của bạn: Góc trên bên phải (nhỏ)
- Nhấn 🎤 để tắt/bật microphone
- Nhấn 📹 để tắt/bật camera
- Nhấn ❌ để kết thúc

### 6️⃣ Đăng xuất

Nhấn nút "Đăng xuất" ở góc trên bên phải để thoát khỏi phòng chat.

## 🧪 Test với nhiều người dùng

Để test ứng dụng một mình:

### Cách 1: Nhiều tab trình duyệt
1. Mở tab mới (Ctrl+T)
2. Truy cập `http://localhost:3000`
3. Đăng nhập với tên khác
4. Lặp lại cho nhiều tab

### Cách 2: Nhiều trình duyệt
1. Mở Chrome: đăng nhập với tên "User 1"
2. Mở Firefox: đăng nhập với tên "User 2"
3. Mở Edge: đăng nhập với tên "User 3"

### Cách 3: Chế độ ẩn danh
1. Mở cửa sổ thường: đăng nhập "User 1"
2. Mở cửa sổ ẩn danh (Ctrl+Shift+N): đăng nhập "User 2"

## ⚠️ Lưu ý quan trọng

### Quyền truy cập Camera/Microphone
- Lần đầu gọi điện, trình duyệt sẽ hỏi quyền
- Nhấn "Cho phép" để sử dụng tính năng
- Nếu từ chối, bạn không thể gọi điện

### Kết nối mạng
- Cần kết nối internet ổn định
- Nếu mất kết nối, reload trang để kết nối lại

### Hiệu suất
- Đóng các tab không cần thiết
- Tắt các ứng dụng đang dùng camera/mic

## 🐛 Xử lý sự cố

### Không thấy người dùng khác
- Kiểm tra xem họ đã đăng nhập chưa
- Reload trang (F5)
- Kiểm tra console (F12) xem có lỗi không

### Không gửi được tin nhắn
- Kiểm tra kết nối internet
- Reload trang
- Xem console có lỗi không

### Không gọi được điện
**Lỗi: "Không thể truy cập camera/microphone"**
- Kiểm tra quyền truy cập trong trình duyệt
- Đảm bảo không có app nào đang dùng camera/mic
- Thử trình duyệt khác

**Lỗi: "Cuộc gọi không kết nối"**
- Kiểm tra kết nối internet
- Đảm bảo cả hai người đều online
- Thử gọi lại

### Lỗi TypeScript khi mở project
- Chạy `npm install` để cài đặt dependencies
- Đợi VSCode index xong
- Reload VSCode (Ctrl+Shift+P > "Reload Window")

### Port 3000 đã được sử dụng
```bash
# Dừng process đang dùng port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Hoặc chạy trên port khác:
npm run dev -- -p 3001
```

## 📱 Sử dụng trên điện thoại

1. Tìm địa chỉ IP của máy tính:
   ```bash
   # Windows:
   ipconfig
   
   # Mac/Linux:
   ifconfig
   ```

2. Trên điện thoại, truy cập:
   ```
   http://<IP-của-máy-tính>:3000
   ```
   Ví dụ: `http://192.168.1.100:3000`

3. Đảm bảo điện thoại và máy tính cùng mạng WiFi

## 🎨 Tùy chỉnh

### Thay đổi màu sắc
Chỉnh sửa file `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    500: '#0ea5e9', // Màu chính
    600: '#0284c7', // Màu hover
  },
}
```

### Thay đổi font chữ
Chỉnh sửa file `app/layout.tsx`:
```typescript
import { Roboto } from "next/font/google";
const roboto = Roboto({ 
  weight: ['400', '700'],
  subsets: ["latin"] 
});
```

## 📞 Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra console (F12)
2. Đọc phần "Xử lý sự cố" ở trên
3. Xem file README.md để biết thêm chi tiết

## 🎉 Chúc bạn sử dụng vui vẻ!

Ứng dụng này được tạo ra để học tập và thử nghiệm. Hãy thoải mái khám phá và tùy chỉnh theo ý muốn!