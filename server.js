const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const users = new Map();

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('join', (username) => {
      const user = {
        id: socket.id,
        username,
        online: true,
      };
      
      users.set(socket.id, user);
      
      // Gửi danh sách users cho client mới
      socket.emit('users-list', Array.from(users.values()));
      
      // Thông báo cho tất cả về user mới
      socket.broadcast.emit('user-joined', user);
      
      // Gửi tin nhắn hệ thống
      const systemMessage = {
        id: Date.now().toString(),
        senderId: 'system',
        senderName: 'System',
        content: `${username} đã tham gia phòng chat`,
        timestamp: Date.now(),
        type: 'system',
      };
      io.emit('message', systemMessage);
    });

    socket.on('send-message', (content) => {
      const user = users.get(socket.id);
      if (user) {
        const message = {
          id: Date.now().toString(),
          senderId: socket.id,
          senderName: user.username,
          content,
          timestamp: Date.now(),
          type: 'text',
        };
        io.emit('message', message);
      }
    });

    socket.on('call-user', (data) => {
      socket.to(data.to).emit('call-user', data);
    });

    socket.on('accept-call', (data) => {
      socket.to(data.to).emit('call-accepted', data.signal);
    });

    socket.on('end-call', (data) => {
      socket.to(data.to).emit('call-ended');
    });

    socket.on('disconnect', () => {
      const user = users.get(socket.id);
      if (user) {
        users.delete(socket.id);
        socket.broadcast.emit('user-left', socket.id);
        
        const systemMessage = {
          id: Date.now().toString(),
          senderId: 'system',
          senderName: 'System',
          content: `${user.username} đã rời khỏi phòng chat`,
          timestamp: Date.now(),
          type: 'system',
        };
        socket.broadcast.emit('message', systemMessage);
      }
      console.log('Client disconnected:', socket.id);
    });
  });

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});

// Made with Bob
