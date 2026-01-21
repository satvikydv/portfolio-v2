import React from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Lock, Github } from 'lucide-react';
import querynImg from '../assets/queryn.png';

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
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold">My Projects</h1>
          <a 
            href="https://github.com/satvikydv" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project 1: Queryn */}
          <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <img src={querynImg} alt="Queryn" className="h-40 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">Queryn</h3>
              <p className="text-gray-600 text-sm mb-4">Intelligent Code Analysis Platform</p>
              <div className="flex gap-2">
                <a 
                  href="https://queryn-gold.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                >
                  Live Demo
                </a>
                <a 
                  href="https://github.com/satvikydv/queryn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-gray-800 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-gray-900 transition-colors flex items-center justify-center gap-1"
                >
                  <Github className="w-4 h-4" />
                  Code
                </a>
              </div>
            </div>
          </div>

          {/* Placeholder for more projects */}
          {[2, 3, 4].map((i) => (
            <div key={i} className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow opacity-50">
              <div className="h-40 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-lg">Coming Soon</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-400">Project {i}</h3>
                <p className="text-gray-400 text-sm">More projects coming soon...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Safari;