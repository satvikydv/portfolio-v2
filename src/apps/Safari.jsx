import React from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Lock } from 'lucide-react';

const Safari = () => {
  return (
    <div className="flex flex-col h-full bg-white text-black">
      {/* Toolbar */}
      <div className="h-12 bg-gray-100 border-b border-gray-200 flex items-center px-4 gap-4">
        <div className="flex gap-2 text-gray-500">
          <ArrowLeft className="w-4 h-4" />
          <ArrowRight className="w-4 h-4" />
          <RotateCw className="w-4 h-4" />
        </div>
        
        <div className="flex-1 max-w-2xl mx-auto bg-gray-200 rounded-lg flex items-center px-3 py-1.5 gap-2 text-sm">
          <Lock className="w-3 h-3 text-gray-500" />
          <span className="flex-1 text-center text-gray-700">portfolio.com</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-white p-8">
        <h1 className="text-4xl font-bold mb-6">My Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-40 bg-gray-200 animate-pulse" />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Project {i}</h3>
                <p className="text-gray-600 text-sm">A wonderful project built with React and Tailwind CSS.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Safari;
