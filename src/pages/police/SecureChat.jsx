import React, { useState } from 'react';
import { User, Phone, Video, Camera, Mic, FileText, Send } from 'lucide-react';
import { mockMessages } from './mockData';

const SecureChat = () => {
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(mockMessages[0].user);

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4">Messages</h3>
        <div className="space-y-2">
          {mockMessages.map((msg) => (
            <button
              key={msg.id}
              onClick={() => setSelectedUser(msg.user)}
              className={`w-full text-left p-3 rounded-xl transition-all ${
                selectedUser === msg.user ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-white font-bold">{msg.user}</span>
                {msg.unread && <span className="w-2 h-2 bg-red-500 rounded-full" />}
              </div>
              <p className="text-gray-400 text-sm truncate">{msg.message}</p>
              <p className="text-gray-500 text-xs mt-1">{msg.time}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl flex flex-col h-[600px]">
        <div className="p-4 border-b border-white/20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white font-bold">{selectedUser}</p>
              <p className="text-green-400 text-xs flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                <span>Online</span>
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all">
              <Phone className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all">
              <Video className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          <div className="flex justify-start">
            <div className="bg-white/20 rounded-2xl rounded-tl-none p-3 max-w-xs">
              <p className="text-white text-sm">Officer, any update on my theft case?</p>
              <p className="text-gray-400 text-xs mt-1">2 mins ago</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl rounded-tr-none p-3 max-w-xs">
              <p className="text-white text-sm">Yes, we have assigned an investigating officer. You'll receive updates shortly.</p>
              <p className="text-gray-200 text-xs mt-1">1 min ago</p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-white/20 rounded-2xl rounded-tl-none p-3 max-w-xs">
              <p className="text-white text-sm">Thank you so much! I really appreciate the quick response.</p>
              <p className="text-gray-400 text-xs mt-1">Just now</p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-white/20">
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center space-x-2">
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="flex space-x-2 mt-2">
            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all">
              <Camera className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all">
              <Mic className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all">
              <FileText className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecureChat;
