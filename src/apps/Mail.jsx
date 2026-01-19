import React from 'react';
import { Search, Edit, Star, Trash } from 'lucide-react';

const Mail = () => {
  return (
    <div className="flex h-full bg-white text-black">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 flex flex-col">
        <div className="p-3 border-b border-gray-200">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-2 top-1.5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full pl-8 pr-3 py-1 bg-gray-100 rounded-md text-sm focus:outline-none"
            />
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3 border-b border-gray-100 hover:bg-blue-50 cursor-pointer">
              <div className="flex justify-between mb-1">
                <span className="font-bold text-sm">Recruiter {i}</span>
                <span className="text-xs text-gray-500">10:30 AM</span>
              </div>
              <div className="text-sm font-medium mb-1">Job Opportunity</div>
              <div className="text-xs text-gray-500 truncate">
                Hi, I saw your portfolio and I'm very impressed...
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <div className="h-12 border-b border-gray-200 flex items-center justify-between px-4">
          <div className="flex gap-4 text-gray-500">
            <Trash className="w-5 h-5" />
            <Star className="w-5 h-5" />
          </div>
          <Edit className="w-5 h-5 text-blue-500" />
        </div>
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">Contact Me</h2>
          <form className="space-y-4 max-w-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input type="text" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea rows={6} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Mail;
