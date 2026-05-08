# 📂 Cấu trúc dự án Chat App

## Tổng quan

Dự án được tổ chức theo cấu trúc Next.js 14 App Router với TypeScript.

```
chat-app/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes
│   │   └── socket/
│   │       └── route.ts      # Socket.io server endpoint
│   ├── chat/                 # Trang chat
│   │   └── page.tsx          # Giao diện chat chính
│   ├── globals.css           # CSS toàn cục
│   ├── layout.tsx            # Layout chính của app
│   └── page.tsx              # Trang đăng nhập (home)
│
├── components/               # React Components
│   ├── CallModal.tsx         # Modal hiển thị cuộc gọi
│   ├── ChatMessage.tsx       # Component tin nhắn đơn lẻ
│   └── UserList.tsx          # Danh sách người dùng online
│
├── hooks/                    # Custom React Hooks
│   └── useSocket.ts          # Hook quản lý Socket.io connection
│
├── store/                    # State Management
│   └── chatStore.ts          # Zustand store cho chat
│
├── types/                    # TypeScript Type Definitions
│   └── index.ts              # Các interface và type chung
│
├── .env.example              # Template file môi trường
├── .gitignore                # Git ignore rules
├── HUONG_DAN.md              # Hướng dẫn tiếng Việt
├── next.config.js            # Cấu hình Next.js
├── package.json              # Dependencies và scripts
├── postcss.config.js         # Cấu hình PostCSS
├── README.md                 # Tài liệu dự án
├── tailwind.config.ts        # Cấu hình Tailwind CSS
└── tsconfig.json             # Cấu hình TypeScript
```

## Chi tiết các thư mục

### 📁 app/

Thư mục chính của Next.js App Router.

#### `app/page.tsx` - Trang đăng nhập
- Form nhập tên người dùng
- Lưu username vào localStorage
- Redirect đến `/chat` sau khi đăng nhập

#### `app/layout.tsx` - Layout chính
- Cấu hình font (Inter)
- Import global CSS
- Metadata cho SEO

#### `app/globals.css` - CSS toàn cục
- Import Tailwind directives
- Custom scrollbar styles
- CSS variables cho theme

#### `app/chat/page.tsx` - Trang chat chính
**Chức năng:**
- Quản lý state của chat
- Xử lý gửi/nhận tin nhắn
- Xử lý cuộc gọi voice/video
- Hiển thị danh sách người dùng
- Hiển thị tin nhắn

**Hooks sử dụng:**
- `useState`: Quản lý local state
- `useEffect`: Side effects và cleanup
- `useRef`: Reference đến DOM và Peer instance
- `useRouter`: Navigation
- `useSocket`: Custom hook cho Socket.io
- `useChatStore`: Zustand store

#### `app/api/socket/route.ts` - Socket.io Server
**Chức năng:**
- Khởi tạo Socket.io server
- Quản lý kết nối client
- Xử lý events:
  - `join`: User tham gia
  - `send-message`: Gửi tin nhắn
  - `call-user`: Bắt đầu cuộc gọi
  - `accept-call`: Chấp nhận cuộc gọi
  - `end-call`: Kết thúc cuộc gọi
  - `disconnect`: User rời khỏi

### 📁 components/

Các React component tái sử dụng.

#### `ChatMessage.tsx`
**Props:**
- `message`: Đối tượng Message
- `isOwn`: Boolean (tin nhắn của mình hay không)

**Chức năng:**
- Hiển thị tin nhắn text
- Hiển thị tin nhắn hệ thống
- Format thời gian
- Styling khác nhau cho tin nhắn của mình và người khác

#### `UserList.tsx`
**Props:**
- `users`: Mảng User objects
- `currentUserId`: ID của user hiện tại
- `onVoiceCall`: Callback khi gọi thoại
- `onVideoCall`: Callback khi gọi video

**Chức năng:**
- Hiển thị danh sách người dùng online
- Avatar với chữ cái đầu
- Trạng thái online
- Nút gọi thoại và video

#### `CallModal.tsx`
**Props:**
- `isOpen`: Boolean
- `isIncoming`: Cuộc gọi đến hay đi
- `callerName`: Tên người gọi
- `callType`: 'voice' hoặc 'video'
- `onAccept`: Callback chấp nhận
- `onReject`: Callback từ chối
- `localStream`: MediaStream local
- `remoteStream`: MediaStream remote

**Chức năng:**
- Hiển thị UI cuộc gọi đến
- Hiển thị UI cuộc gọi đang diễn ra
- Video preview (local và remote)
- Controls: mute, video on/off, end call

### 📁 hooks/

Custom React Hooks.

#### `useSocket.ts`
**Tham số:**
- `username`: Tên người dùng

**Return:**
- `socket`: Socket.io instance
- `sendMessage`: Function gửi tin nhắn
- `callUser`: Function bắt đầu cuộc gọi
- `acceptCall`: Function chấp nhận cuộc gọi
- `endCall`: Function kết thúc cuộc gọi

**Chức năng:**
- Khởi tạo Socket.io connection
- Lắng nghe events từ server
- Cập nhật Zustand store
- Cleanup khi unmount

### 📁 store/

State management với Zustand.

#### `chatStore.ts`
**State:**
- `messages`: Mảng tin nhắn
- `users`: Mảng người dùng online
- `currentUser`: User hiện tại

**Actions:**
- `addMessage`: Thêm tin nhắn mới
- `setUsers`: Set danh sách users
- `setCurrentUser`: Set user hiện tại
- `addUser`: Thêm user mới
- `removeUser`: Xóa user
- `clearMessages`: Xóa tất cả tin nhắn

### 📁 types/

TypeScript type definitions.

#### `index.ts`
**Interfaces:**
- `Message`: Cấu trúc tin nhắn
- `User`: Cấu trúc người dùng
- `CallData`: Dữ liệu cuộc gọi
- `SocketEvents`: Events của Socket.io

## Luồng dữ liệu

### 1. Đăng nhập
```
User nhập tên → localStorage → Redirect /chat
```

### 2. Kết nối Socket.io
```
/chat mount → useSocket hook → Socket.io connect → 
Emit 'join' → Server add user → Broadcast 'user-joined' →
All clients update user list
```

### 3. Gửi tin nhắn
```
User nhập tin nhắn → sendMessage() → Socket emit 'send-message' →
Server broadcast 'message' → All clients receive → 
useChatStore.addMessage() → UI update
```

### 4. Cuộc gọi
```
User A click call → getMediaStream() → Create Peer →
Peer generate signal → Socket emit 'call-user' →
Server forward to User B → User B receive 'call-user' →
User B create Peer → Peer signal back → 
Socket emit 'accept-call' → User A receive signal →
Peer connection established → Stream exchange
```

## Công nghệ sử dụng

### Frontend
- **Next.js 14**: React framework với App Router
- **React 18**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS
- **Lucide React**: Icon library

### Real-time Communication
- **Socket.io**: WebSocket library
- **Simple-peer**: WebRTC wrapper

### State Management
- **Zustand**: Lightweight state management

### Utilities
- **date-fns**: Date formatting

## Patterns và Best Practices

### 1. Component Organization
- Mỗi component trong file riêng
- Props interface được định nghĩa rõ ràng
- Export default component

### 2. State Management
- Global state: Zustand store
- Local state: useState
- Server state: Socket.io events

### 3. Type Safety
- Tất cả interfaces trong `types/`
- Strict TypeScript config
- No implicit any

### 4. Styling
- Tailwind utility classes
- Responsive design
- Consistent color scheme

### 5. Error Handling
- Try-catch cho async operations
- User-friendly error messages
- Console logging cho debugging

## Performance Considerations

### 1. Optimization
- React.memo cho components không thay đổi thường xuyên
- useCallback cho event handlers
- useRef cho values không trigger re-render

### 2. WebRTC
- Peer connection cleanup
- Stream track stop khi kết thúc
- Error handling cho media devices

### 3. Socket.io
- Event listener cleanup
- Reconnection handling
- Efficient event naming

## Security Notes

⚠️ **Lưu ý**: Đây là phiên bản demo/học tập

**Cần cải thiện cho production:**
- Authentication thực sự (JWT, OAuth)
- Authorization và permissions
- Input validation và sanitization
- Rate limiting
- HTTPS/WSS
- Database cho persistence
- Error logging và monitoring

## Mở rộng trong tương lai

### Tính năng có thể thêm:
1. **Database Integration**
   - PostgreSQL/MongoDB
   - Lưu trữ tin nhắn
   - User profiles

2. **Authentication**
   - NextAuth.js
   - Email/password
   - Social login

3. **Advanced Features**
   - Private rooms
   - File sharing
   - Emoji reactions
   - Typing indicators
   - Read receipts

4. **UI/UX**
   - Dark mode
   - Custom themes
   - Animations
   - Mobile app (React Native)

5. **Performance**
   - Message pagination
   - Virtual scrolling
   - Image optimization
   - CDN integration