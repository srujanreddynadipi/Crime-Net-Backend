import React from 'react';
import { Phone, Globe, HelpCircle, Shield, Heart } from 'lucide-react';

const HelpResources = () => {
  const resources = [
    { title: 'Emergency Contacts', icon: Phone, desc: 'Police, Ambulance, Fire Department', color: 'from-red-200 to-red-300' },
    { title: 'Victim Support', icon: Heart, desc: 'Counseling and rehabilitation', color: 'from-purple-200 to-purple-300' },
    { title: 'Safety Guidelines', icon: Shield, desc: 'Tips for personal safety', color: 'from-green-200 to-green-300' },
    { title: 'Cybercrime Help', icon: Globe, desc: 'Report online fraud and scams', color: 'from-orange-200 to-orange-300' },
    { title: 'FAQs', icon: HelpCircle, desc: 'Frequently asked questions', color: 'from-blue-200 to-blue-300' },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800">Help & Resources</h3>

      <div className="grid md:grid-cols-3 gap-6">
        {resources.map((resource, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer">
            <div className={`w-14 h-14 bg-gradient-to-br ${resource.color} rounded-xl flex items-center justify-center mb-4`}>
              <resource.icon className="w-7 h-7 text-gray-800" />
            </div>
            <h4 className="text-gray-800 font-bold text-lg mb-2">{resource.title}</h4>
            <p className="text-gray-600 text-sm">{resource.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-100 to-purple-200 rounded-2xl p-8 text-gray-900 shadow-sm border border-gray-200">
        <h4 className="text-2xl font-bold mb-3">Need Immediate Help?</h4>
        <p className="mb-6 text-gray-700">Our support team is available 24/7 to assist you</p>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <button className="bg-white text-blue-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all flex items-center justify-center space-x-2">
            <Phone className="w-5 h-5" />
            <span>Call Support</span>
          </button>
          <button className="bg-white/60 backdrop-blur-sm border-2 border-white text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-white/70 transition-all flex items-center justify-center space-x-2">
            <HelpCircle className="w-5 h-5" />
            <span>Live Chat</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpResources;
