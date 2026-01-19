import React from 'react';
import { Folder, FileText, Image, Music, Video } from 'lucide-react';

const Finder = () => {
  const sidebarItems = [
    { icon: <Folder className="w-4 h-4 text-blue-500" />, label: 'Applications' },
    { icon: <Folder className="w-4 h-4 text-blue-500" />, label: 'Desktop' },
    { icon: <Folder className="w-4 h-4 text-blue-500" />, label: 'Documents' },
    { icon: <Folder className="w-4 h-4 text-blue-500" />, label: 'Downloads' },
  ];

  const files = [
    { icon: <FileText className="w-12 h-12 text-gray-500" />, label: 'Resume.pdf' },
    { icon: <Image className="w-12 h-12 text-blue-500" />, label: 'Profile.jpg' },
    { icon: <Folder className="w-12 h-12 text-blue-400 fill-current" />, label: 'Projects' },
  ];

  return (
    <div className="flex h-full bg-white text-black">
      {/* Sidebar */}
      <div className="w-48 bg-gray-100/80 backdrop-blur-xl p-4 border-r border-gray-200">
        <div className="text-xs font-bold text-gray-500 mb-2 px-2">Favorites</div>
        {sidebarItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-200 cursor-pointer text-sm">
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <div className="grid grid-cols-4 gap-4">
          {files.map((file, index) => (
            <div key={index} className="flex flex-col items-center gap-2 p-2 hover:bg-blue-100 rounded cursor-pointer">
              {file.icon}
              <span className="text-sm">{file.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Finder;
