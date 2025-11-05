import React from 'react';
import { AlertTriangle, User, Bell } from 'lucide-react';

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

export default MissingPersons;
