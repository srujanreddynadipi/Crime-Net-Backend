import React from 'react';
import { Users, AlertCircle, CheckCircle2 } from 'lucide-react';

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

export default CommunityWatch;
