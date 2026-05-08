# 💬 Chat App - Ứng dụng nhắn tin & gọi điện

Ứng dụng chat hiện đại được xây dựng với Next.js, hỗ trợ nhắn tin real-time và gọi điện (voice/video) sử dụng WebRTC.

## ✨ Tính năng

- 💬 **Nhắn tin real-time**: Gửi và nhận tin nhắn ngay lập tức
- 📞 **Gọi thoại**: Gọi điện thoại với người dùng khác
- 📹 **Gọi video**: Gọi video call với camera và microphone
- 👥 **Danh sách người dùng**: Xem ai đang online
- 🎨 **Giao diện đẹp**: Thiết kế hiện đại với Tailwind CSS
- 🔔 **Thông báo**: Nhận thông báo khi có người tham gia/rời khỏi

## 🚀 Công nghệ sử dụng

- **Frontend & Backend**: Next.js 14 (App Router)
- **Real-time Communication**: Socket.io
- **WebRTC**: Simple-peer
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript

## 📦 Cài đặt

### 1. Clone repository hoặc tải về

```bash
cd chat-app
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Chạy ứng dụng

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: `http://localhost:3000`

## 🎯 Cách sử dụng

### Bước 1: Đăng nhập
1. Mở trình duyệt và truy cập `http://localhost:3000`
2. Nhập tên của bạn
3. Nhấn "Bắt đầu chat"

### Bước 2: Nhắn tin
1. Nhập tin nhắn vào ô input ở dưới cùng
2. Nhấn "Gửi" hoặc Enter để gửi tin nhắn
3. Tin nhắn sẽ hiển thị cho tất cả người dùng đang online

### Bước 3: Gọi điện
1. Xem danh sách người dùng online ở bên trái
2. Nhấn nút 📞 để gọi thoại
3. Nhấn nút 📹 để gọi video
4. Người nhận sẽ thấy thông báo cuộc gọi đến
5. Chấp nhận hoặc từ chối cuộc gọi

### Bước 4: Trong cuộc gọi
- Nhấn nút 🎤 để tắt/bật microphone
- Nhấn nút 📹 để tắt/bật camera (chỉ video call)
- Nhấn nút ❌ để kết thúc cuộc gọi

## 🧪 Test với nhiều người dùng

Để test ứng dụng với nhiều người dùng:

1. Mở nhiều tab trình duyệt hoặc nhiều trình duyệt khác nhau
2. Mỗi tab đăng nhập với tên khác nhau
3. Bắt đầu nhắn tin và gọi điện giữa các tab

**Lưu ý**: Để test gọi video, bạn cần cho phép trình duyệt truy cập camera và microphone.

## 📁 Cấu trúc thư mục

```
chat-app/
├── app/
│   ├── api/
│   │   └── socket/
│   │       └── route.ts          # Socket.io server
│   ├── chat/
│   │   └── page.tsx              # Trang chat chính
│   ├── globals.css               # CSS global
│   ├── layout.tsx                # Layout chính
│   └── page.tsx                  # Trang đăng nhập
├── components/
│   ├── CallModal.tsx             # Modal cuộc gọi
│   ├── ChatMessage.tsx           # Component tin nhắn
│   └── UserList.tsx              # Danh sách người dùng
├── hooks/
│   └── useSocket.ts              # Hook quản lý Socket.io
├── store/
│   └── chatStore.ts              # Zustand store
├── types/
│   └── index.ts                  # TypeScript types
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🔧 Cấu hình

### Socket.io
Socket.io server được cấu hình tại `app/api/socket/route.ts`. Server tự động khởi tạo khi ứng dụng chạy.

### WebRTC
WebRTC sử dụng thư viện `simple-peer` để thiết lập kết nối peer-to-peer giữa các client.

## 🐛 Xử lý lỗi thường gặp

### Lỗi: "Cannot access camera/microphone"
- Đảm bảo bạn đã cho phép trình duyệt truy cập camera và microphone
- Kiểm tra xem camera/microphone có đang được sử dụng bởi ứng dụng khác không

### Lỗi: "Socket connection failed"
- Kiểm tra xem server có đang chạy không
- Đảm bảo port 3000 không bị chiếm bởi ứng dụng khác

### Lỗi: TypeScript errors
- Chạy `npm install` để cài đặt tất cả dependencies
- Các lỗi TypeScript sẽ biến mất sau khi cài đặt xong

## 🚀 Deploy

### Vercel (Khuyến nghị)
1. Push code lên GitHub
2. Import project vào Vercel
3. Deploy tự động

**Lưu ý**: Socket.io có thể cần cấu hình thêm cho production. Xem xét sử dụng dịch vụ như Pusher hoặc Ably cho production.

## 📝 Tính năng có thể mở rộng

- [ ] Lưu trữ tin nhắn vào database
- [ ] Xác thực người dùng (đăng ký/đăng nhập)
- [ ] Phòng chat riêng tư
- [ ] Gửi file và hình ảnh
- [ ] Emoji và stickers
- [ ] Thông báo push
- [ ] Mã hóa end-to-end
- [ ] Chia sẻ màn hình

## 📄 License

MIT License - Tự do sử dụng cho mục đích cá nhân và thương mại.

## 👨‍💻 Tác giả

Được xây dựng với ❤️ bằng Next.js và Socket.io

---

**Chúc bạn có trải nghiệm tuyệt vời với Chat App! 🎉**