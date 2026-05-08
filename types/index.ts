export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: number;
  type: 'text' | 'system';
}

export interface User {
  id: string;
  username: string;
  online: boolean;
}

export interface CallData {
  from: string;
  fromName: string;
  to: string;
  signal: any;
  type: 'voice' | 'video';
}

export interface SocketEvents {
  'user-joined': (user: User) => void;
  'user-left': (userId: string) => void;
  'message': (message: Message) => void;
  'users-list': (users: User[]) => void;
  'call-user': (data: CallData) => void;
  'call-accepted': (signal: any) => void;
  'call-ended': () => void;
}

// Made with Bob
