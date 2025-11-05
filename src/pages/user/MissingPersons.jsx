import React from 'react';
import { User, MapPin, Share2, AlertTriangle } from 'lucide-react';

const MissingPersons = () => {
  const missingPersons = [
    { id: 'MP001', name: 'Rahul Verma', age: 28, location: 'Bangalore', date: '2 days ago', status: 'searching' },
    { id: 'MP002', name: 'Priya Nair', age: 16, location: 'Chennai', date: '5 days ago', status: 'searching' },
    { id: 'MP003', name: 'Amit Shah', age: 45, location: 'Delhi', date: '1 week ago', status: 'found' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800">Missing Persons</h3>
        <button className="bg-gradient-to-r from-red-200 to-pink-300 text-gray-900 px-6 py-3 rounded-xl font-bold hover:shadow flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5" />
          <span>Report Missing Person</span>
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {missingPersons.map((person) => (
          <div key={person.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all">
            <div className="bg-gradient-to-br from-orange-200 to-red-300 h-48 flex items-center justify-center">
              <User className="w-24 h-24 text-white/80" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  person.status === 'searching' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'
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
                <button className="flex-1 bg-gradient-to-r from-blue-200 to-purple-300 text-gray-900 py-2 rounded-lg font-medium hover:shadow">
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

export default MissingPersons;
