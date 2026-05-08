import { create } from 'zustand';
import { Message, User } from '@/types';

interface ChatState {
  messages: Message[];
  users: User[];
  currentUser: User | null;
  addMessage: (message: Message) => void;
  setUsers: (users: User[]) => void;
  setCurrentUser: (user: User) => void;
  addUser: (user: User) => void;
  removeUser: (userId: string) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  users: [],
  currentUser: null,
  
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  
  setUsers: (users) =>
    set({ users }),
  
  setCurrentUser: (user) =>
    set({ currentUser: user }),
  
  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
    })),
  
  removeUser: (userId) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== userId),
    })),
  
  clearMessages: () =>
    set({ messages: [] }),
}));

// Made with Bob
