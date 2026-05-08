# 🚀 KHỞI ĐỘNG NHANH

## ⚠️ LỖI HIỆN TẠI

Bạn đang gặp lỗi Socket.io vì server cũ đang chạy. Cần RESTART lại server.

## ✅ CÁCH SỬA

### Bước 1: Dừng server hiện tại
Trong terminal đang chạy `npm run dev`, nhấn:
```
Ctrl + C
```

### Bước 2: Xóa thư mục .next (cache)
```bash
rmdir /s /q .next
```

Hoặc xóa thủ công thư mục `.next` trong File Explorer

### Bước 3: Khởi động lại server
```bash
npm run dev
```

## 📝 Giải thích

- Tôi đã tạo **custom server** (`server.js`) để Socket.io hoạt động với Next.js
- File `app/api/socket/route.ts` cũ không còn được sử dụng (có thể xóa)
- Server mới sẽ chạy Socket.io trực tiếp trên HTTP server

## ✨ Sau khi restart

1. Mở trình duyệt: `http://localhost:3000`
2. Nhập tên và bắt đầu chat
3. Mở nhiều tab để test với nhiều người dùng

## 🎯 Nếu vẫn lỗi

Chạy lệnh sau để clean hoàn toàn:

```bash
# Dừng server (Ctrl+C)
# Xóa cache
rmdir /s /q .next
rmdir /s /q node_modules
del package-lock.json

# Cài lại
npm install

# Chạy
npm run dev
```

---

**Lưu ý**: Đây là phiên bản demo, Socket.io đã được cấu hình để hoạt động với custom server!