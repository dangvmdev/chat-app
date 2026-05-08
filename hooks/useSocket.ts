'use client';

import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useChatStore } from '@/store/chatStore';
import { Message, User } from '@/types';

export const useSocket = (username: string) => {
  const socketRef = useRef<Socket | null>(null);
  const { addMessage, setUsers, addUser, removeUser, setCurrentUser } = useChatStore();

  useEffect(() => {
    // Khởi tạo socket connection
    const socketInstance = io();

    socketRef.current = socketInstance;

    socketInstance.on('connect', () => {
      console.log('Connected to socket server');
      socketInstance.emit('join', username);
      
      setCurrentUser({
        id: socketInstance.id || '',
        username,
        online: true,
      });
    });

    socketInstance.on('users-list', (users: User[]) => {
      setUsers(users);
    });

    socketInstance.on('user-joined', (user: User) => {
      addUser(user);
    });

    socketInstance.on('user-left', (userId: string) => {
      removeUser(userId);
    });

    socketInstance.on('message', (message: Message) => {
      addMessage(message);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [username, addMessage, setUsers, addUser, removeUser, setCurrentUser]);

  const sendMessage = (content: string) => {
    if (socketRef.current) {
      socketRef.current.emit('send-message', content);
    }
  };

  const callUser = (userId: string, signal: any, type: 'voice' | 'video') => {
    if (socketRef.current) {
      socketRef.current.emit('call-user', {
        to: userId,
        from: socketRef.current.id,
        fromName: username,
        signal,
        type,
      });
    }
  };

  const acceptCall = (userId: string, signal: any) => {
    if (socketRef.current) {
      socketRef.current.emit('accept-call', {
        to: userId,
        signal,
      });
    }
  };

  const endCall = (userId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('end-call', {
        to: userId,
      });
    }
  };

  return {
    socket: socketRef.current,
    sendMessage,
    callUser,
    acceptCall,
    endCall,
  };
};

// Made with Bob
