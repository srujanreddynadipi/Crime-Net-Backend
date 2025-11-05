import React, { useState } from 'react';
import DashboardHeader from './police/DashboardHeader';
import Sidebar from './police/Sidebar';
import Dashboard from './police/Dashboard';

// Active Cases Table
const ActiveCasesTable = () => {
  const [filter, setFilter] = useState('all');
  const [selectedCase, setSelectedCase] = useState(null);
  
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'urgent': return 'text-red-400 bg-red-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-green-400 bg-green-500/20';
    }
  };
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'new': return 'text-blue-400 bg-blue-500/20';
      case 'in-progress': return 'text-yellow-400 bg-yellow-500/20';
      case 'resolved': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };
  
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <h3 className="text-2xl font-bold text-white">Active Cases</h3>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search cases..."
              className="bg-white/5 border border-white/20 rounded-xl pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white hover:bg-white/20 transition-all flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left text-gray-400 font-medium py-3 px-4">Case ID</th>
              <th className="text-left text-gray-400 font-medium py-3 px-4">Type</th>
              <th className="text-left text-gray-400 font-medium py-3 px-4">Location</th>
              <th className="text-left text-gray-400 font-medium py-3 px-4">Priority</th>
              <th className="text-left text-gray-400 font-medium py-3 px-4">Status</th>
              <th className="text-left text-gray-400 font-medium py-3 px-4">Time</th>
              <th className="text-left text-gray-400 font-medium py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockCases.map((caseItem) => (
              <tr key={caseItem.id} className="border-b border-white/10 hover:bg-white/5 transition-all">
                <td className="py-4 px-4">
                  <span className="text-white font-bold">{caseItem.id}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-300">{caseItem.type}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300 text-sm">{caseItem.location}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(caseItem.priority)}`}>
                    {caseItem.priority.toUpperCase()}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(caseItem.status)}`}>
                    {caseItem.status.replace('-', ' ').toUpperCase()}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-400 text-sm">{caseItem.time}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setSelectedCase(caseItem)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                      Accept
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Case Detail Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedCase(null)}>
          <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">Case Details - {selectedCase.id}</h3>
                <p className="text-gray-400">Reported by {selectedCase.reporter}</p>
              </div>
              <button onClick={() => setSelectedCase(null)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <p className="text-gray-400 text-sm mb-1">Crime Type</p>
                <p className="text-white font-bold text-lg">{selectedCase.type}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <p className="text-gray-400 text-sm mb-1">Location</p>
                <p className="text-white font-bold text-lg">{selectedCase.location}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <p className="text-gray-400 text-sm mb-1">Priority</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(selectedCase.priority)}`}>
                  {selectedCase.priority.toUpperCase()}
                </span>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <p className="text-gray-400 text-sm mb-1">Evidence Count</p>
                <p className="text-white font-bold text-lg">{selectedCase.evidence} files</p>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-xl p-4 border border-white/20 mb-6">
              <h4 className="text-white font-bold mb-3 flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Description</span>
              </h4>
              <p className="text-gray-300 leading-relaxed">
                This is a detailed description of the incident. The reporter has provided comprehensive information including time, date, and circumstances. Multiple witnesses have been identified and evidence has been uploaded to the system.
              </p>
            </div>
            
            <div className="bg-white/10 rounded-xl p-4 border border-white/20 mb-6">
              <h4 className="text-white font-bold mb-3 flex items-center space-x-2">
                <Camera className="w-5 h-5" />
                <span>Evidence Files</span>
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/10 hover:border-blue-500 transition-all cursor-pointer">
                    <Image className="w-8 h-8 text-blue-400 mb-2" />
                    <p className="text-gray-300 text-xs">Evidence_{i}.jpg</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center space-x-2">
                <UserCheck className="w-5 h-5" />
                <span>Accept Case</span>
              </button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Contact Reporter</span>
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition-all border border-white/20">
                Reassign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Live Crime Map
const LiveCrimeMap = () => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">Live Crime Map</h3>
        <div className="flex space-x-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-all border border-white/20">
            Filters
          </button>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl h-96 flex items-center justify-center border border-white/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-red-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-orange-500 rounded-full filter blur-3xl animate-pulse"></div>
        </div>
        <div className="text-center z-10">
          <MapPin className="w-16 h-16 text-white mx-auto mb-4" />
          <p className="text-white text-xl font-bold mb-2">Interactive Crime Map</p>
          <p className="text-gray-300">Real-time crime locations with heat mapping</p>
          <div className="flex space-x-4 mt-6 justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-white text-sm">Urgent</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="text-white text-sm">High Priority</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-white text-sm">Normal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Secure Chat Component
const SecureChat = () => {
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(mockMessages[0].user);
  
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Chat List */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4">Messages</h3>
        <div className="space-y-2">
          {mockMessages.map((msg) => (
            <button
              key={msg.id}
              onClick={() => setSelectedUser(msg.user)}
              className={`w-full text-left p-3 rounded-xl transition-all ${
                selectedUser === msg.user
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-white font-bold">{msg.user}</span>
                {msg.unread && (
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </div>
              <p className="text-gray-400 text-sm truncate">{msg.message}</p>
              <p className="text-gray-500 text-xs mt-1">{msg.time}</p>
            </button>
          ))}
        </div>
      </div>
      
      {/* Chat Window */}
      <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl flex flex-col h-[600px]">
        <div className="p-4 border-b border-white/20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white font-bold">{selectedUser}</p>
              <p className="text-green-400 text-xs flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
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

// Analytics Dashboard
const AnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Crime Hotspots */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
            <Target className="w-6 h-6" />
            <span>Crime Hotspots</span>
          </h3>
          <div className="space-y-4">
            {mockHotspots.map((hotspot, idx) => (
              <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-bold">{hotspot.area}</span>
                  <div className="flex items-center space-x-2">
                    {hotspot.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-red-400" />
                    ) : hotspot.trend === 'down' ? (
                      <TrendingUp className="w-4 h-4 text-green-400 transform rotate-180" />
                    ) : (
                      <Activity className="w-4 h-4 text-yellow-400" />
                    )}
                    <span className={`text-sm font-bold ${
                      hotspot.trend === 'up' ? 'text-red-400' : 
                      hotspot.trend === 'down' ? 'text-green-400' : 
                      'text-yellow-400'
                    }`}>
                      {hotspot.percentage > 0 ? '+' : ''}{hotspot.percentage}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{hotspot.crimes} incidents</span>
                  <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Response Time Analytics */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
            <Clock className="w-6 h-6" />
            <span>Response Time Analytics</span>
          </h3>
          <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl p-6 border border-white/20 h-64 flex flex-col justify-center">
            <div className="text-center mb-6">
              <p className="text-6xl font-bold text-white mb-2">8.2m</p>
              <p className="text-gray-300">Average Response Time</p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-400">6.1m</p>
                <p className="text-gray-400 text-xs">Urgent</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-400">8.5m</p>
                <p className="text-gray-400 text-xs">High</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-400">10.2m</p>
                <p className="text-gray-400 text-xs">Medium</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Case Resolution Rate */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
          <BarChart3 className="w-6 h-6" />
          <span>Case Resolution Trends</span>
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          {['This Week', 'This Month', 'Last 3 Months', 'This Year'].map((period, idx) => (
            <div key={idx} className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-4 border border-white/10">
              <p className="text-gray-400 text-sm mb-2">{period}</p>
              <p className="text-3xl font-bold text-white mb-1">{85 + idx * 2}%</p>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                  style={{ width: `${85 + idx * 2}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Missing Persons Module
const MissingPersons = () => {
  const missingPersons = [
    { id: 'MP001', name: 'Rahul Verma', age: 28, location: 'Last seen: Bangalore', date: '2 days ago', image: true },
    { id: 'MP002', name: 'Priya Nair', age: 16, location: 'Last seen: Chennai', date: '5 days ago', image: true },
    { id: 'MP003', name: 'Amit Shah', age: 45, location: 'Last seen: Delhi', date: '1 week ago', image: true },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-white">Missing Persons Database</h3>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5" />
          <span>Report New Case</span>
        </button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {missingPersons.map((person) => (
          <div key={person.id} className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-br from-red-900 to-orange-900 h-48 flex items-center justify-center">
              <User className="w-24 h-24 text-white opacity-50" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-red-400 font-bold text-sm bg-red-500/20 px-3 py-1 rounded-full">
                  {person.id}
                </span>
                <span className="text-gray-400 text-xs">{person.date}</span>
              </div>
              <h4 className="text-white font-bold text-xl mb-2">{person.name}</h4>
              <p className="text-gray-400 text-sm mb-1">Age: {person.age}</p>
              <p className="text-gray-400 text-sm mb-4">{person.location}</p>
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-all">
                  View Details
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-all border border-white/20">
                  <Bell className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Community Watch Module
const CommunityWatch = () => {
  const communities = [
    { name: 'Koramangala Watch', members: 234, alerts: 12, status: 'active' },
    { name: 'Indiranagar Safety', members: 189, alerts: 8, status: 'active' },
    { name: 'Whitefield Guard', members: 156, alerts: 5, status: 'moderate' },
  ];
  
  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-4">Active Community Groups</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {communities.map((community, idx) => (
            <div key={idx} className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border border-white/10 hover:border-blue-500 transition-all">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-10 h-10 text-blue-400" />
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  community.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {community.status.toUpperCase()}
                </span>
              </div>
              <h4 className="text-white font-bold text-lg mb-3">{community.name}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Members</span>
                  <span className="text-white font-bold">{community.members}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Active Alerts</span>
                  <span className="text-white font-bold">{community.alerts}</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-all">
                Manage Group
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4">Recent Community Reports</h3>
        <div className="space-y-3">
          {[
            { type: 'Suspicious Activity', area: 'Koramangala', time: '10 mins ago', verified: false },
            { type: 'Street Light Issue', area: 'Indiranagar', time: '1 hour ago', verified: true },
            { type: 'Traffic Violation', area: 'Whitefield', time: '2 hours ago', verified: true },
          ].map((report, idx) => (
            <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold">{report.type}</p>
                  <p className="text-gray-400 text-sm">{report.area} • {report.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {report.verified ? (
                  <span className="text-green-400 text-sm font-bold flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verified</span>
                  </span>
                ) : (
                  <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                    Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Evidence Vault
const EvidenceVault = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-white">Evidence Management System</h3>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Upload Evidence</span>
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition-all border border-white/20">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { type: 'Images', count: 234, icon: Image, color: 'from-blue-500 to-blue-600' },
          { type: 'Videos', count: 67, icon: FileVideo, color: 'from-purple-500 to-purple-600' },
          { type: 'Audio', count: 45, icon: Mic, color: 'from-green-500 to-green-600' },
          { type: 'Documents', count: 189, icon: FileText, color: 'from-orange-500 to-orange-600' },
        ].map((category, idx) => (
          <div key={idx} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-4`}>
              <category.icon className="w-7 h-7 text-white" />
            </div>
            <p className="text-gray-400 text-sm mb-1">{category.type}</p>
            <p className="text-3xl font-bold text-white">{category.count}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4">Recent Evidence Uploads</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-4 border border-white/10 hover:border-blue-500 transition-all cursor-pointer">
              <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg h-32 flex items-center justify-center mb-3">
                <Camera className="w-12 h-12 text-white opacity-50" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-bold text-sm">Evidence_{item}.jpg</span>
                <Lock className="w-4 h-4 text-green-400" />
              </div>
              <p className="text-gray-400 text-xs mb-2">Case: CR00{item}</p>
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-xs font-medium transition-all">
                  View
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-all">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Reports Module
const ReportsModule = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-white">Generate Reports</h3>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>Export All</span>
        </button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: 'Daily Crime Report', desc: 'Summary of all incidents today', icon: Calendar },
          { title: 'Monthly Analytics', desc: 'Comprehensive monthly statistics', icon: BarChart3 },
          { title: 'Performance Report', desc: 'Officer and team performance', icon: Award },
          { title: 'Case Resolution', desc: 'Resolved cases breakdown', icon: CheckCircle },
          { title: 'Evidence Inventory', desc: 'Complete evidence catalog', icon: Lock },
          { title: 'Community Feedback', desc: 'Citizen ratings and reviews', icon: Star },
        ].map((report, idx) => (
          <div key={idx} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <report.icon className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-white font-bold text-lg mb-2">{report.title}</h4>
            <p className="text-gray-400 text-sm mb-4">{report.desc}</p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-all flex items-center justify-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Generate</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main App
export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const officer = {
    name: 'Inspector Rajesh Kumar',
    badge: 'Badge #45821',
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <DashboardHeader 
        officer={officer} 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="lg:ml-64 pt-20">
        <Dashboard activeTab={activeTab} />
      </div>
    </div>
  );
}