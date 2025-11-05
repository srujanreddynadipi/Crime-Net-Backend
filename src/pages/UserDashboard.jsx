import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import UDHeader from './user/DashboardHeader';
import UDSidebar from './user/Sidebar';
import Dashboard from './user/Dashboard';
import { 
  Shield, AlertCircle, MessageSquare, Users, MapPin, Phone, Clock, 
  CheckCircle, Star, Menu, X, Bell, FileText, Camera, Video, 
  TrendingUp, Activity, Search, Filter, ChevronDown, Send, 
  User, Award, BarChart3, Home, Radio, Eye, Lock, Download, Upload, 
  RefreshCw, MapPinned, Mic, Image, FileVideo, Calendar, ThumbsUp, 
  AlertTriangle, CheckCircle2, XCircle, Settings, LogOut, ChevronRight,
  Package, Flag, HelpCircle, Languages, UserCircle, Edit, Plus, Trash2,
  Share2, ExternalLink, Navigation, PlayCircle, FileText as Document,
  Heart, Bookmark, MessageCircle, Globe, Info, Zap, Target, Megaphone
} from 'lucide-react';

// Mock Data
const mockUserCases = [
  { id: 'CR001', type: 'Theft', location: 'MG Road, Bangalore', status: 'under-review', priority: 'high', date: '2 days ago', officer: 'Inspector Kumar', progress: 60 },
  { id: 'CR002', type: 'Vehicle Theft', location: 'Indiranagar', status: 'assigned', priority: 'urgent', date: '5 hours ago', officer: 'Officer Sharma', progress: 30 },
  { id: 'CR003', type: 'Cyber Crime', location: 'Electronic City', status: 'resolved', priority: 'medium', date: '1 week ago', officer: 'Inspector Patel', progress: 100 },
];

const mockAlerts = [
  { id: 1, type: 'Missing Person', location: 'Nearby - 2km', time: '15 mins ago', severity: 'urgent' },
  { id: 2, type: 'Vehicle Theft Alert', location: 'Your area', time: '1 hour ago', severity: 'high' },
  { id: 3, type: 'Safety Advisory', location: 'Koramangala', time: '3 hours ago', severity: 'info' },
];

const mockCommunityPosts = [
  { id: 1, user: 'Priya S.', avatar: 'P', post: 'Suspicious activity near Park Street. Stay alert!', time: '10 mins ago', likes: 12, comments: 5 },
  { id: 2, user: 'Rajesh K.', avatar: 'R', post: 'Found a lost wallet near Metro Station. Contact me if yours.', time: '1 hour ago', likes: 28, comments: 8 },
  { id: 3, user: 'Anita M.', avatar: 'A', post: 'Thanks to CrimeNet, my stolen bike was recovered!', time: '3 hours ago', likes: 45, comments: 12 },
];

// Header Component
const DashboardHeader = ({ user, onMenuToggle }) => {
  const [notifications, setNotifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  
  return (
    <header className="fixed w-full top-0 z-50 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 shadow-lg border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <button onClick={onMenuToggle} className="text-gray-700 lg:hidden hover:bg-white/50 p-2 rounded-lg transition-all">
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">CrimeNet</span>
                <span className="text-xs text-gray-500">Stay Safe, Stay Connected</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all">
              <AlertCircle className="w-4 h-4" />
              <span>SOS</span>
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 bg-white rounded-full border border-gray-200 hover:shadow-md transition-all"
              >
                <Bell className="w-5 h-5 text-gray-700" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {notifications}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 max-h-96 overflow-y-auto">
                  <h4 className="font-bold text-gray-800 mb-3">Notifications</h4>
                  {mockAlerts.map((alert) => (
                    <div key={alert.id} className="mb-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          alert.severity === 'urgent' ? 'bg-red-100' :
                          alert.severity === 'high' ? 'bg-orange-100' : 'bg-blue-100'
                        }`}>
                          <AlertTriangle className={`w-5 h-5 ${
                            alert.severity === 'urgent' ? 'text-red-600' :
                            alert.severity === 'high' ? 'text-orange-600' : 'text-blue-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800 text-sm">{alert.type}</p>
                          <p className="text-gray-600 text-xs">{alert.location}</p>
                          <p className="text-gray-400 text-xs mt-1">{alert.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-3 bg-white rounded-full px-3 py-2 border border-gray-200 hover:shadow-md transition-all cursor-pointer">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{user.name.charAt(0)}</span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-gray-800 font-bold text-sm">{user.name}</p>
                <p className="text-gray-500 text-xs">{user.email}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Sidebar Component
const Sidebar = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'report', label: 'Report Crime', icon: AlertCircle },
    { id: 'cases', label: 'My Cases', icon: FileText },
    { id: 'track', label: 'Track Case', icon: MapPinned },
    { id: 'chat', label: 'Messages', icon: MessageSquare },
    { id: 'community', label: 'Community Watch', icon: Users },
    { id: 'alerts', label: 'Safety Alerts', icon: Bell },
    { id: 'missing', label: 'Missing Persons', icon: Search },
    { id: 'resources', label: 'Help & Resources', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];
  
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}
      
      <aside className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-white via-blue-50 to-purple-50 shadow-xl z-40 transform transition-transform duration-300 border-r border-gray-200 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } pt-20`}>
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                onClose();
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-white hover:shadow-md'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Emergency</p>
              <p className="text-white/80 text-xs">24/7 Support</p>
            </div>
          </div>
          <button className="w-full bg-white hover:bg-gray-100 text-red-600 py-2 rounded-xl font-bold transition-all flex items-center justify-center space-x-2">
            <Zap className="w-4 h-4" />
            <span>Call 100</span>
          </button>
        </div>
      </aside>
    </>
  );
};

// Quick Stats Component
const QuickStats = () => {
  const stats = [
    { label: 'Active Cases', value: '2', icon: Activity, gradient: 'from-blue-400 to-blue-600', bg: 'bg-blue-50' },
    { label: 'Resolved Cases', value: '5', icon: CheckCircle, gradient: 'from-green-400 to-green-600', bg: 'bg-green-50' },
    { label: 'Community Points', value: '245', icon: Award, gradient: 'from-purple-400 to-purple-600', bg: 'bg-purple-50' },
    { label: 'Safety Score', value: '8.5/10', icon: Shield, gradient: 'from-orange-400 to-orange-600', bg: 'bg-orange-50' },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <div key={idx} className={`${stat.bg} rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

// Quick Actions Component
const QuickActions = ({ setActiveTab }) => {
  const actions = [
    { id: 'report', label: 'Report Crime', icon: AlertCircle, gradient: 'from-red-500 to-pink-600', desc: 'File a new complaint' },
    { id: 'track', label: 'Track Case', icon: MapPinned, gradient: 'from-blue-500 to-purple-600', desc: 'Check case status' },
    { id: 'chat', label: 'Chat with Officer', icon: MessageSquare, gradient: 'from-green-500 to-teal-600', desc: 'Secure messaging' },
    { id: 'missing', label: 'Report Missing', icon: Search, gradient: 'from-orange-500 to-red-600', desc: 'Person or item' },
  ];
  
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => setActiveTab(action.id)}
            className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-4 hover:shadow-xl transition-all transform hover:scale-105 text-left"
          >
            <div className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center mb-3 shadow-lg`}>
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <p className="font-bold text-gray-800 text-sm mb-1">{action.label}</p>
            <p className="text-gray-500 text-xs">{action.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

// My Cases Component
const MyCases = () => {
  const [selectedCase, setSelectedCase] = useState(null);
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'under-review': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'assigned': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'resolved': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };
  
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'urgent': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-green-100 text-green-700 border-green-200';
    }
  };
  
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">My Cases</h3>
        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1">
          <span>View All</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-4">
        {mockUserCases.map((caseItem) => (
          <div key={caseItem.id} className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="font-bold text-gray-800">{caseItem.id}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(caseItem.status)}`}>
                    {caseItem.status.replace('-', ' ').toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(caseItem.priority)}`}>
                    {caseItem.priority.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-700 font-medium mb-1">{caseItem.type}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{caseItem.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{caseItem.date}</span>
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCase(caseItem)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all"
              >
                View Details
              </button>
            </div>
            
            <div className="mt-3">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Progress</span>
                <span className="text-gray-800 font-bold">{caseItem.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${caseItem.progress}%` }}
                ></div>
              </div>
              {caseItem.officer && (
                <p className="text-gray-600 text-xs mt-2">Assigned to: <span className="font-bold text-gray-800">{caseItem.officer}</span></p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {selectedCase && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedCase(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Case #{selectedCase.id}</h3>
                <p className="text-gray-600">{selectedCase.type}</p>
              </div>
              <button onClick={() => setSelectedCase(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-gray-600 text-sm mb-1">Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(selectedCase.status)}`}>
                  {selectedCase.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-gray-600 text-sm mb-1">Priority</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(selectedCase.priority)}`}>
                  {selectedCase.priority.toUpperCase()}
                </span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-gray-600 text-sm mb-1">Location</p>
                <p className="text-gray-800 font-bold">{selectedCase.location}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-gray-600 text-sm mb-1">Reported</p>
                <p className="text-gray-800 font-bold">{selectedCase.date}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-6">
              <h4 className="font-bold text-gray-800 mb-3">Timeline</h4>
              <div className="space-y-3">
                {[
                  { status: 'Report Filed', time: '2 days ago', completed: true },
                  { status: 'Under Review', time: '1 day ago', completed: true },
                  { status: 'Officer Assigned', time: '12 hours ago', completed: true },
                  { status: 'Investigation', time: 'In Progress', completed: false },
                  { status: 'Resolution', time: 'Pending', completed: false },
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-gray-300'
                    }`}>
                      {step.completed ? <CheckCircle className="w-5 h-5 text-white" /> : <Clock className="w-5 h-5 text-gray-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium text-sm">{step.status}</p>
                      <p className="text-gray-500 text-xs">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all">
                Chat with Officer
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold transition-all">
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Community Feed Component
const CommunityFeed = () => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Community Watch Feed</h3>
      
      <div className="space-y-4">
        {mockCommunityPosts.map((post) => (
          <div key={post.id} className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all">
            <div className="flex items-start space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {post.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-bold text-gray-800">{post.user}</p>
                  <p className="text-gray-400 text-xs">{post.time}</p>
                </div>
                <p className="text-gray-700 text-sm">{post.post}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600 ml-13">
              <button className="flex items-center space-x-1 hover:text-red-600 transition-all">
                <Heart className="w-4 h-4" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-600 transition-all">
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-green-600 transition-all">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all">
        View All Posts
      </button>
    </div>
  );
};

// Safety Tips Component
const SafetyTips = () => {
  const tips = [
    { icon: Eye, title: 'Stay Alert', desc: 'Be aware of your surroundings at all times' },
    { icon: Users, title: 'Travel in Groups', desc: 'Safety in numbers, especially at night' },
    { icon: Phone, title: 'Keep Contacts Ready', desc: 'Have emergency numbers on speed dial' },
  ];
  
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200 shadow-lg mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
        <Shield className="w-6 h-6 text-blue-600" />
        <span>Safety Tips</span>
      </h3>
      
      <div className="space-y-3">
        {tips.map((tip, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 border border-blue-100 hover:shadow-md transition-all">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <tip.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">{tip.title}</p>
                <p className="text-gray-600 text-xs">{tip.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Report Crime Component
const ReportCrime = () => {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    location: '',
    anonymous: false
  });
  
  const crimeTypes = ['Theft', 'Assault', 'Vehicle Theft', 'Cyber Crime', 'Harassment', 'Missing Person', 'Other'];
  
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Report a Crime</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Crime Type</label>
          <select 
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          >
            <option value="">Select crime type</option>
            {crimeTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea 
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 h-32 resize-none"
            placeholder="Describe the incident in detail..."
          ></textarea>
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">Location</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              placeholder="Enter location or use current location"
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-600 font-medium text-sm hover:text-blue-700">
              Use GPS
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Upload Photos</label>
            <button className="w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl py-8 hover:bg-gray-100 transition-all">
              <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 text-sm">Add Photos</p>
            </button>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Upload Videos</label>
            <button className="w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl py-8 hover:bg-gray-100 transition-all">
              <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 text-sm">Add Videos</p>
            </button>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Voice Notes</label>
            <button className="w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl py-8 hover:bg-gray-100 transition-all">
              <Mic className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 text-sm">Record</p>
            </button>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input 
              type="checkbox"
              checked={formData.anonymous}
              onChange={(e) => setFormData({...formData, anonymous: e.target.checked})}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <p className="text-gray-800 font-medium">Report Anonymously</p>
              <p className="text-gray-600 text-sm">Your identity will be protected</p>
            </div>
          </label>
        </div>
        
        <div className="flex space-x-4">
          <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center space-x-2">
            <Send className="w-5 h-5" />
            <span>Submit Report</span>
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold transition-all">
            Save Draft
          </button>
        </div>
      </div>
    </div>
  );
};

// Chat Component
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
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Messages</h3>
        <div className="space-y-2">
          {chats.map((chat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedChat(chat.name)}
              className={`w-full text-left p-3 rounded-xl transition-all ${
                selectedChat === chat.name
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    selectedChat === chat.name ? 'bg-white/20' : 'bg-gradient-to-br from-blue-500 to-purple-600'
                  }`}>
                    <User className={`w-6 h-6 ${selectedChat === chat.name ? 'text-white' : 'text-white'}`} />
                  </div>
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`font-bold text-sm ${selectedChat === chat.name ? 'text-white' : 'text-gray-800'}`}>
                      {chat.name}
                    </p>
                    {chat.unread > 0 && (
                      <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                  <p className={`text-xs truncate ${selectedChat === chat.name ? 'text-white/80' : 'text-gray-600'}`}>
                    {chat.lastMsg}
                  </p>
                  <p className={`text-xs ${selectedChat === chat.name ? 'text-white/60' : 'text-gray-400'}`}>
                    {chat.time}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-lg flex flex-col h-[600px]">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-800 font-bold">{selectedChat}</p>
              <p className="text-green-600 text-xs flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                <span>Online</span>
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 bg-white hover:bg-gray-100 rounded-lg transition-all shadow-sm">
              <Phone className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 bg-white hover:bg-gray-100 rounded-lg transition-all shadow-sm">
              <Video className="w-5 h-5 text-gray-700" />
            </button>
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
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl rounded-tr-none p-3 max-w-xs shadow-lg">
              <p className="text-white text-sm">Yes, I have uploaded additional photos in the evidence section.</p>
              <p className="text-white/80 text-xs mt-1">10:32 AM</p>
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
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg">
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all">
              <Camera className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all">
              <Mic className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all">
              <FileText className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Missing Persons Component
const MissingPersonsModule = () => {
  const missingPersons = [
    { id: 'MP001', name: 'Rahul Verma', age: 28, location: 'Bangalore', date: '2 days ago', status: 'searching' },
    { id: 'MP002', name: 'Priya Nair', age: 16, location: 'Chennai', date: '5 days ago', status: 'searching' },
    { id: 'MP003', name: 'Amit Shah', age: 45, location: 'Delhi', date: '1 week ago', status: 'found' },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800">Missing Persons</h3>
        <button className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5" />
          <span>Report Missing Person</span>
        </button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {missingPersons.map((person) => (
          <div key={person.id} className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition-all">
            <div className="bg-gradient-to-br from-orange-400 to-red-600 h-48 flex items-center justify-center">
              <User className="w-24 h-24 text-white opacity-70" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  person.status === 'searching' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-green-100 text-green-700 border border-green-200'
                }`}>
                  {person.status.toUpperCase()}
                </span>
                <span className="text-gray-400 text-xs">{person.date}</span>
              </div>
              <h4 className="text-gray-800 font-bold text-xl mb-2">{person.name}</h4>
              <p className="text-gray-600 text-sm mb-1">Age: {person.age}</p>
              <p className="text-gray-600 text-sm mb-4 flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>Last seen: {person.location}</span>
              </p>
              <div className="flex space-x-2">
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                  View Details
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Safety Alerts Component
const SafetyAlertsModule = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800">Safety Alerts</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {mockAlerts.map((alert) => (
          <div key={alert.id} className={`rounded-2xl p-6 border-2 shadow-lg ${
            alert.severity === 'urgent' ? 'bg-red-50 border-red-200' :
            alert.severity === 'high' ? 'bg-orange-50 border-orange-200' : 'bg-blue-50 border-blue-200'
          }`}>
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                alert.severity === 'urgent' ? 'bg-red-500' :
                alert.severity === 'high' ? 'bg-orange-500' : 'bg-blue-500'
              }`}>
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-gray-800 font-bold">{alert.type}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    alert.severity === 'urgent' ? 'bg-red-200 text-red-800' :
                    alert.severity === 'high' ? 'bg-orange-200 text-orange-800' : 'bg-blue-200 text-blue-800'
                  }`}>
                    {alert.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-700 text-sm mb-2">{alert.location}</p>
                <p className="text-gray-500 text-xs mb-3">{alert.time}</p>
                <button className="bg-white hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-all border border-gray-200">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200 shadow-lg">
        <h4 className="text-gray-800 font-bold text-lg mb-4">Subscribe to Alerts</h4>
        <p className="text-gray-600 mb-4">Get instant notifications about safety incidents in your area</p>
        <div className="flex space-x-3">
          <input 
            type="text" 
            placeholder="Enter your location..."
            className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
          />
          <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

// Help & Resources Component
const HelpResourcesModule = () => {
  const resources = [
    { title: 'Emergency Contacts', icon: Phone, desc: 'Police, Ambulance, Fire Department', color: 'from-red-400 to-red-600' },
    { title: 'Legal Aid', icon: Scale, desc: 'Free legal consultation services', color: 'from-blue-400 to-blue-600' },
    { title: 'Victim Support', icon: Heart, desc: 'Counseling and rehabilitation', color: 'from-purple-400 to-purple-600' },
    { title: 'Safety Guidelines', icon: Shield, desc: 'Tips for personal safety', color: 'from-green-400 to-green-600' },
    { title: 'Cybercrime Help', icon: Globe, desc: 'Report online fraud and scams', color: 'from-orange-400 to-orange-600' },
    { title: 'FAQs', icon: HelpCircle, desc: 'Frequently asked questions', color: 'from-pink-400 to-pink-600' },
  ];
  
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800">Help & Resources</h3>
      
      <div className="grid md:grid-cols-3 gap-6">
        {resources.map((resource, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all cursor-pointer">
            <div className={`w-14 h-14 bg-gradient-to-br ${resource.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
              <resource.icon className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-gray-800 font-bold text-lg mb-2">{resource.title}</h4>
            <p className="text-gray-600 text-sm">{resource.desc}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <h4 className="text-2xl font-bold mb-3">Need Immediate Help?</h4>
        <p className="mb-6 text-white/90">Our support team is available 24/7 to assist you</p>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all flex items-center justify-center space-x-2">
            <Phone className="w-5 h-5" />
            <span>Call Support</span>
          </button>
          <button className="bg-white/20 backdrop-blur-sm border-2 border-white/50 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/30 transition-all flex items-center justify-center space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span>Live Chat</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Content
const DashboardContent = ({ activeTab, setActiveTab }) => {
  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <>
            <QuickStats />
            <QuickActions setActiveTab={setActiveTab} />
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <MyCases />
              </div>
              <div>
                <SafetyTips />
                <CommunityFeed />
              </div>
            </div>
          </>
        );
      case 'report':
        return <ReportCrime />;
      case 'cases':
        return <MyCases />;
      case 'chat':
        return <ChatModule />;
      case 'missing':
        return <MissingPersonsModule />;
      case 'alerts':
        return <SafetyAlertsModule />;
      case 'community':
        return <CommunityFeed />;
      case 'resources':
        return <HelpResourcesModule />;
      default:
        return <QuickStats />;
    }
  };
  
  return (
    <div className="flex-1 p-4 md:p-8">
      {renderContent()}
    </div>
  );
};

// Main App
export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser, signOut } = useAuth();
  
  const user = {
    name: currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User',
    email: currentUser?.email || 'user@example.com',
  };
  
  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = '/login';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <UDHeader 
        user={user} 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
        onLogout={handleLogout}
        setActiveTab={setActiveTab}
      />
      <UDSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="lg:ml-64 pt-20">
        <Dashboard activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}