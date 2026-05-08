'use client';

import { User } from '@/types';
import { Users, Phone, Video } from 'lucide-react';

interface UserListProps {
  users: User[];
  currentUserId: string;
  onVoiceCall: (userId: string) => void;
  onVideoCall: (userId: string) => void;
}

export default function UserList({ users, currentUserId, onVoiceCall, onVideoCall }: UserListProps) {
  const otherUsers = users.filter(u => u.id !== currentUserId);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 h-full">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b">
        <Users className="w-5 h-5 text-blue-500" />
        <h2 className="font-semibold text-gray-800">
          Người dùng ({otherUsers.length})
        </h2>
      </div>

      <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-200px)]">
        {otherUsers.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <p>Chưa có người dùng nào khác</p>
          </div>
        ) : (
          otherUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  {user.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{user.username}</p>
                  <p className="text-xs text-green-500">Đang online</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onVoiceCall(user.id)}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                  title="Gọi thoại"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onVideoCall(user.id)}
                  className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition"
                  title="Gọi video"
                >
                  <Video className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Made with Bob
