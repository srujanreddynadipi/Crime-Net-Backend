import React, { useState } from 'react';
import { User, Phone, Video, Camera, Mic, FileText, Send } from 'lucide-react';

const ChatModule = () => {
  const [message, setMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState('Officer Kumar');

  const chats = [
    { name: 'Officer Kumar', lastMsg: 'Your case is being reviewed', time: '2m ago', unread: 2, online: true },
    { name: 'Officer Sharma', lastMsg: 'Evidence received successfully', time: '1h ago', unread: 0, online: false },
    { name: 'Support Team', lastMsg: 'How can we help you?', time: '3h ago', unread: 0, online: true },
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Messages</h3>
        <div className="space-y-2">
          {chats.map((chat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedChat(chat.name)}
              className={`w-full text-left p-3 rounded-xl transition-all ${
                selectedChat === chat.name ? 'bg-gradient-to-r from-blue-200 to-purple-300 text-gray-900' : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    selectedChat === chat.name ? 'bg-white' : 'bg-gradient-to-br from-blue-300 to-purple-400'
                  }`}>
                    <User className={`w-6 h-6 ${selectedChat === chat.name ? 'text-gray-700' : 'text-white'}`} />
                  </div>
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`font-bold text-sm ${selectedChat === chat.name ? 'text-gray-800' : 'text-gray-800'}`}>{chat.name}</p>
                    {chat.unread > 0 && (
                      <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{chat.unread}</span>
                    )}
                  </div>
                  <p className={`text-xs truncate ${selectedChat === chat.name ? 'text-gray-600' : 'text-gray-600'}`}>{chat.lastMsg}</p>
                  <p className={`text-xs ${selectedChat === chat.name ? 'text-gray-500' : 'text-gray-400'}`}>{chat.time}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-[600px]">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-300 to-purple-400 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-800 font-bold">{selectedChat}</p>
              <p className="text-green-700 text-xs flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                <span>Online</span>
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 bg-white hover:bg-gray-100 rounded-lg transition-all shadow-sm"><Phone className="w-5 h-5 text-gray-700" /></button>
            <button className="p-2 bg-white hover:bg-gray-100 rounded-lg transition-all shadow-sm"><Video className="w-5 h-5 text-gray-700" /></button>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-tl-none p-3 max-w-xs shadow-sm border border-gray-200">
              <p className="text-gray-800 text-sm">Hello, I'm reviewing your case. Could you provide more details?</p>
              <p className="text-gray-400 text-xs mt-1">10:30 AM</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-gradient-to-r from-blue-200 to-purple-300 rounded-2xl rounded-tr-none p-3 max-w-xs shadow">
              <p className="text-gray-800 text-sm">Yes, I have uploaded additional photos in the evidence section.</p>
              <p className="text-gray-600 text-xs mt-1">10:32 AM</p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-tl-none p-3 max-w-xs shadow-sm border border-gray-200">
              <p className="text-gray-800 text-sm">Perfect! I've received them. We'll process your case within 24 hours.</p>
              <p className="text-gray-400 text-xs mt-1">10:35 AM</p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
            />
            <button className="bg-gradient-to-r from-blue-200 to-purple-300 text-gray-900 px-6 py-3 rounded-xl font-bold transition-all shadow">
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all"><Camera className="w-5 h-5 text-gray-600" /></button>
            <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all"><Mic className="w-5 h-5 text-gray-600" /></button>
            <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all"><FileText className="w-5 h-5 text-gray-600" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModule;
