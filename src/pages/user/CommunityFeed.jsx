import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { communityPosts } from './mockData';

const CommunityFeed = () => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Community Watch Feed</h3>
      <div className="space-y-4">
        {communityPosts.map((post) => (
          <div key={post.id} className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
            <div className="flex items-start space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-300 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
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
      <button className="w-full mt-4 bg-gradient-to-r from-blue-200 to-purple-300 text-gray-900 py-3 rounded-xl font-bold hover:shadow">
        View All Posts
      </button>
    </div>
  );
};

export default CommunityFeed;
