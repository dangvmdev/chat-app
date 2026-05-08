# 🔧 Khắc phục sự cố - Troubleshooting

## ❌ Lỗi: 'next' is not recognized as an internal or external command

### Nguyên nhân:
Lỗi này xảy ra khi bạn chạy `npm run dev` trước khi cài đặt dependencies.

### Giải pháp:

#### Bước 1: Xóa các file cũ (nếu có)
```bash
# Xóa node_modules và package-lock.json
rmdir /s /q node_modules
del package-lock.json
```

#### Bước 2: Cài đặt lại dependencies
```bash
npm install
```

**Lưu ý:** Quá trình này có thể mất 2-5 phút tùy vào tốc độ mạng.

Bạn sẽ thấy output như sau khi thành công:
```
added 345 packages, and audited 346 packages in 2m

120 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

#### Bước 3: Kiểm tra cài đặt
```bash
# Kiểm tra xem node_modules đã được tạo chưa
dir node_modules
```

Nếu thấy thư mục `node_modules` với nhiều thư mục con bên trong, cài đặt đã thành công!

#### Bước 4: Chạy ứng dụng
```bash
npm run dev
```

Bạn sẽ thấy:
```
  ▲ Next.js 14.2.3
  - Local:        http://localhost:3000

 ✓ Ready in 2.5s
```

## 🐛 Các lỗi thường gặp khác

### Lỗi: Port 3000 đã được sử dụng

**Giải pháp 1:** Dừng process đang dùng port 3000
```bash
# Tìm process
netstat -ano | findstr :3000

# Dừng process (thay <PID> bằng số PID tìm được)
taskkill /PID <PID> /F
```

**Giải pháp 2:** Chạy trên port khác
```bash
npm run dev -- -p 3001
```

### Lỗi: Cannot find module 'next'

**Nguyên nhân:** Dependencies chưa được cài đặt đúng

**Giải pháp:**
```bash
# Xóa và cài lại
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Lỗi: EACCES permission denied

**Giải pháp:** Chạy terminal với quyền Administrator
1. Nhấn phải vào Command Prompt hoặc PowerShell
2. Chọn "Run as administrator"
3. Chạy lại `npm install`

### Lỗi: npm ERR! network

**Nguyên nhân:** Vấn đề kết nối mạng hoặc npm registry

**Giải pháp:**
```bash
# Xóa cache npm
npm cache clean --force

# Cài lại
npm install
```

### Lỗi TypeScript trong VSCode

**Nguyên nhân:** VSCode chưa nhận diện dependencies

**Giải pháp:**
1. Đợi `npm install` hoàn thành
2. Reload VSCode: `Ctrl+Shift+P` > "Developer: Reload Window"
3. Hoặc đóng và mở lại VSCode

### Lỗi: Cannot access camera/microphone

**Giải pháp:**
1. Kiểm tra Settings > Privacy > Camera/Microphone
2. Cho phép trình duyệt truy cập
3. Đảm bảo không có app nào khác đang dùng camera/mic
4. Thử trình duyệt khác (Chrome khuyến nghị)

### Lỗi: Socket connection failed

**Nguyên nhân:** Server chưa khởi động hoặc port bị chặn

**Giải pháp:**
1. Đảm bảo `npm run dev` đang chạy
2. Kiểm tra firewall không chặn port 3000
3. Thử tắt antivirus tạm thời
4. Reload trang web

## 📝 Checklist trước khi chạy

- [ ] Node.js đã được cài đặt (kiểm tra: `node --version`)
- [ ] npm đã được cài đặt (kiểm tra: `npm --version`)
- [ ] Đã chạy `npm install` và thấy "added XXX packages"
- [ ] Thư mục `node_modules` đã tồn tại
- [ ] Không có lỗi trong quá trình cài đặt
- [ ] Terminal đang ở đúng thư mục dự án

## 🚀 Quy trình cài đặt đúng

```bash
# 1. Di chuyển vào thư mục dự án
cd d:/VNPT/chat-app

# 2. Kiểm tra Node.js
node --version
# Phải >= v18.0.0

# 3. Cài đặt dependencies
npm install
# Đợi cho đến khi thấy "added XXX packages"

# 4. Chạy development server
npm run dev
# Đợi cho đến khi thấy "Ready in X.Xs"

# 5. Mở trình duyệt
# Truy cập: http://localhost:3000
```

## 💡 Tips

### Tăng tốc độ cài đặt
```bash
# Sử dụng npm cache
npm config set cache C:\npm-cache --global

# Hoặc dùng yarn (nhanh hơn)
npm install -g yarn
yarn install
yarn dev
```

### Kiểm tra logs chi tiết
```bash
# Xem logs đầy đủ
npm run dev --verbose
```

### Clear tất cả và bắt đầu lại
```bash
# Xóa tất cả
rmdir /s /q node_modules
rmdir /s /q .next
del package-lock.json

# Cài lại
npm install

# Chạy
npm run dev
```

## 📞 Vẫn gặp vấn đề?

1. Kiểm tra console trong trình duyệt (F12)
2. Xem terminal có lỗi gì không
3. Đọc kỹ thông báo lỗi
4. Google thông báo lỗi cụ thể
5. Kiểm tra phiên bản Node.js: `node --version`

## 🔍 Debug mode

Để chạy ở chế độ debug:
```bash
# Windows
set DEBUG=* && npm run dev

# Hoặc
$env:DEBUG="*"; npm run dev
```

---

**Lưu ý:** Hầu hết các vấn đề đều được giải quyết bằng cách xóa `node_modules` và chạy lại `npm install`.