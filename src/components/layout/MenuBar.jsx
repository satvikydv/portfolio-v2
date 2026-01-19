import React, { useState, useEffect } from 'react';
import { Apple, Wifi, Battery, Search, Command } from 'lucide-react';
import { format } from 'date-fns';

const MenuBar = ({ activeWindow }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-8 w-full bg-white/20 backdrop-blur-md fixed top-0 left-0 z-50 flex items-center justify-between px-4 text-white text-sm shadow-sm">
      <div className="flex items-center gap-4">
        <Apple className="w-4 h-4 fill-current" />
        <span className="font-bold capitalize">{activeWindow || 'Finder'}</span>
        <div className="hidden sm:flex gap-4 font-medium">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Go</span>
          <span>Window</span>
          <span>Help</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex gap-3">
            <Battery className="w-5 h-5" />
            <Wifi className="w-4 h-4" />
            <Search className="w-4 h-4" />
        </div>
        <span className="font-medium">{format(time, 'EEE MMM d h:mm aa')}</span>
      </div>
    </div>
  );
};

export default MenuBar;
