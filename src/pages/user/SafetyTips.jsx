import React from 'react';
import { Shield, Eye, Users, Phone } from 'lucide-react';

const SafetyTips = () => {
  const tips = [
    { icon: Eye, title: 'Stay Alert', desc: 'Be aware of your surroundings at all times' },
    { icon: Users, title: 'Travel in Groups', desc: 'Safety in numbers, especially at night' },
    { icon: Phone, title: 'Keep Contacts Ready', desc: 'Have emergency numbers on speed dial' },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100 shadow-sm mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
        <Shield className="w-6 h-6 text-blue-600" />
        <span>Safety Tips</span>
      </h3>
      <div className="space-y-3">
        {tips.map((tip, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 border border-blue-100 hover:shadow-sm transition-all">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-300 to-purple-400 rounded-lg flex items-center justify-center">
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

export default SafetyTips;
