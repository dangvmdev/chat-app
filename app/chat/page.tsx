'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Send, LogOut } from 'lucide-react';
import { useChatStore } from '@/store/chatStore';
import { useSocket } from '@/hooks/useSocket';
import ChatMessage from '@/components/ChatMessage';
import UserList from '@/components/UserList';
import CallModal from '@/components/CallModal';
import Peer from 'simple-peer';

export default function ChatPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [callState, setCallState] = useState({
    isOpen: false,
    isIncoming: false,
    callerName: '',
    callType: 'voice' as 'voice' | 'video',
    callerId: '',
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const peerRef = useRef<Peer.Instance | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [remoteStream, setRemoteStream] = useState<MediaStream>();

  const { messages, users, currentUser } = useChatStore();
  const { sendMessage, callUser, acceptCall, endCall, socket } = useSocket(username);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      router.push('/');
      return;
    }
    setUsername(storedUsername);
  }, [router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Lắng nghe cuộc gọi đến
  useEffect(() => {
    if (!socket) return;

    socket.on('call-user', async (data: any) => {
      setCallState({
        isOpen: true,
        isIncoming: true,
        callerName: data.fromName,
        callType: data.type,
        callerId: data.from,
      });

      // Tạo peer để nhận cuộc gọi
      const stream = await getMediaStream(data.type === 'video');
      setLocalStream(stream);

      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream,
      });

      peer.on('signal', (signal) => {
        acceptCall(data.from, signal);
      });

      peer.on('stream', (remoteStream) => {
        setRemoteStream(remoteStream);
      });

      peer.signal(data.signal);
      peerRef.current = peer;
    });

    socket.on('call-accepted', (signal: any) => {
      peerRef.current?.signal(signal);
    });

    socket.on('call-ended', () => {
      handleEndCall();
    });

    return () => {
      socket.off('call-user');
      socket.off('call-accepted');
      socket.off('call-ended');
    };
  }, [socket]);

  const getMediaStream = async (includeVideo: boolean): Promise<MediaStream> => {
    try {
      return await navigator.mediaDevices.getUserMedia({
        video: includeVideo,
        audio: true,
      });
    } catch (error) {
      console.error('Error accessing media devices:', error);
      throw error;
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  const handleVoiceCall = async (userId: string) => {
    try {
      const stream = await getMediaStream(false);
      setLocalStream(stream);

      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream,
      });

      peer.on('signal', (signal) => {
        const user = users.find(u => u.id === userId);
        callUser(userId, signal, 'voice');
        setCallState({
          isOpen: true,
          isIncoming: false,
          callerName: user?.username || 'Unknown',
          callType: 'voice',
          callerId: userId,
        });
      });

      peer.on('stream', (remoteStream) => {
        setRemoteStream(remoteStream);
      });

      peerRef.current = peer;
    } catch (error) {
      console.error('Error starting voice call:', error);
      alert('Không thể truy cập microphone. Vui lòng kiểm tra quyền truy cập.');
    }
  };

  const handleVideoCall = async (userId: string) => {
    try {
      const stream = await getMediaStream(true);
      setLocalStream(stream);

      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream,
      });

      peer.on('signal', (signal) => {
        const user = users.find(u => u.id === userId);
        callUser(userId, signal, 'video');
        setCallState({
          isOpen: true,
          isIncoming: false,
          callerName: user?.username || 'Unknown',
          callType: 'video',
          callerId: userId,
        });
      });

      peer.on('stream', (remoteStream) => {
        setRemoteStream(remoteStream);
      });

      peerRef.current = peer;
    } catch (error) {
      console.error('Error starting video call:', error);
      alert('Không thể truy cập camera/microphone. Vui lòng kiểm tra quyền truy cập.');
    }
  };

  const handleAcceptCall = () => {
    // Peer đã được tạo khi nhận cuộc gọi
  };

  const handleRejectCall = () => {
    endCall(callState.callerId);
    handleEndCall();
  };

  const handleEndCall = () => {
    if (peerRef.current) {
      peerRef.current.destroy();
      peerRef.current = null;
    }
    
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(undefined);
    }
    
    setRemoteStream(undefined);
    setCallState({
      isOpen: false,
      isIncoming: false,
      callerName: '',
      callType: 'voice',
      callerId: '',
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    router.push('/');
  };

  if (!username) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">💬</div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Chat App</h1>
              <p className="text-sm text-gray-500">Xin chào, {username}!</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            <LogOut className="w-4 h-4" />
            Đăng xuất
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-140px)]">
          {/* User List */}
          <div className="lg:col-span-1">
            <UserList
              users={users}
              currentUserId={currentUser?.id || ''}
              onVoiceCall={handleVoiceCall}
              onVideoCall={handleVideoCall}
            />
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3 bg-white rounded-lg shadow-lg flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="text-center">
                    <div className="text-6xl mb-4">💬</div>
                    <p>Chưa có tin nhắn nào</p>
                    <p className="text-sm mt-2">Hãy bắt đầu cuộc trò chuyện!</p>
                  </div>
                </div>
              ) : (
                messages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    message={msg}
                    isOwn={msg.senderId === currentUser?.id}
                  />
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Gửi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Call Modal */}
      <CallModal
        isOpen={callState.isOpen}
        isIncoming={callState.isIncoming}
        callerName={callState.callerName}
        callType={callState.callType}
        onAccept={handleAcceptCall}
        onReject={handleRejectCall}
        localStream={localStream}
        remoteStream={remoteStream}
      />
    </div>
  );
}

// Made with Bob
