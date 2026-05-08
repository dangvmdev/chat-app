'use client';

import { useEffect, useRef, useState } from 'react';
import { Phone, PhoneOff, Video, VideoOff, Mic, MicOff } from 'lucide-react';

interface CallModalProps {
  isOpen: boolean;
  isIncoming: boolean;
  callerName: string;
  callType: 'voice' | 'video';
  onAccept: () => void;
  onReject: () => void;
  localStream?: MediaStream;
  remoteStream?: MediaStream;
}

export default function CallModal({
  isOpen,
  isIncoming,
  callerName,
  callType,
  onAccept,
  onReject,
  localStream,
  remoteStream,
}: CallModalProps) {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream && callType === 'video') {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-4xl w-full mx-4">
        {isIncoming && !remoteStream ? (
          // Màn hình cuộc gọi đến
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4 animate-pulse-slow">
              {callerName.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {callerName}
            </h2>
            <p className="text-gray-600 mb-8">
              {callType === 'video' ? '📹 Cuộc gọi video đến...' : '📞 Cuộc gọi thoại đến...'}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={onReject}
                className="px-8 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition flex items-center gap-2"
              >
                <PhoneOff className="w-5 h-5" />
                Từ chối
              </button>
              <button
                onClick={onAccept}
                className="px-8 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Chấp nhận
              </button>
            </div>
          </div>
        ) : (
          // Màn hình cuộc gọi đang diễn ra
          <div>
            <div className="mb-4 text-center">
              <h3 className="text-xl font-semibold text-gray-800">
                {isIncoming ? `Đang gọi với ${callerName}` : `Đang gọi ${callerName}...`}
              </h3>
            </div>

            {callType === 'video' ? (
              <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ height: '500px' }}>
                {/* Video từ xa */}
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                
                {/* Video local (nhỏ ở góc) */}
                <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-12 text-center">
                <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white text-5xl font-bold mx-auto mb-4">
                  {callerName.charAt(0).toUpperCase()}
                </div>
                <p className="text-white text-xl">Cuộc gọi thoại đang diễn ra...</p>
              </div>
            )}

            {/* Điều khiển cuộc gọi */}
            <div className="flex gap-4 justify-center mt-6">
              <button
                onClick={toggleMute}
                className={`p-4 rounded-full transition ${
                  isMuted ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                title={isMuted ? 'Bật mic' : 'Tắt mic'}
              >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>

              {callType === 'video' && (
                <button
                  onClick={toggleVideo}
                  className={`p-4 rounded-full transition ${
                    isVideoOff ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  title={isVideoOff ? 'Bật camera' : 'Tắt camera'}
                >
                  {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
                </button>
              )}

              <button
                onClick={onReject}
                className="p-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                title="Kết thúc cuộc gọi"
              >
                <PhoneOff className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Made with Bob
