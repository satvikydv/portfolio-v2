import React, { useState, cloneElement } from 'react';
import MenuBar from './MenuBar';
import Dock from './Dock';
import Window from '../os/Window';
import Finder from '../../apps/Finder';
import Safari from '../../apps/Safari';
import Mail from '../../apps/Mail';
import Terminal from '../../apps/Terminal';

const Desktop = () => {
  const [windows, setWindows] = useState([
    { id: 'finder', title: 'Finder', component: <Finder />, isOpen: true, isMin: false, zIndex: 1 },
  ]);
  const [activeWindow, setActiveWindow] = useState('finder');
  const [highestZ, setHighestZ] = useState(1);

  const openWindow = (id, title, component) => {
    const existing = windows.find(w => w.id === id);
    if (existing) {
      setWindows(windows.map(w => w.id === id ? { ...w, isOpen: true, isMin: false, zIndex: highestZ + 1 } : w));
      setActiveWindow(id);
      setHighestZ(highestZ + 1);
    } else {
      setWindows([...windows, { id, title, component, isOpen: true, isMin: false, zIndex: highestZ + 1 }]);
      setActiveWindow(id);
      setHighestZ(highestZ + 1);
    }
  };

  const closeWindow = (id) => {
    setWindows(windows.map(w => w.id === id ? { ...w, isOpen: false } : w));
  };

  const minimizeWindow = (id) => {
    setWindows(windows.map(w => w.id === id ? { ...w, isMin: true } : w));
  };

  const focusWindow = (id) => {
    setWindows(windows.map(w => w.id === id ? { ...w, zIndex: highestZ + 1 } : w));
    setActiveWindow(id);
    setHighestZ(highestZ + 1);
  };

  return (
    <div 
      className="h-screen w-screen overflow-hidden bg-cover bg-center relative"
      style={{ 
        backgroundImage: 'url(https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2070&auto=format&fit=crop)',
        height: '100vh',
        width: '100vw'
      }} // macOS-like mountain wallpaper
    >
      {/* Overlay for better text contrast if needed, or just the image */}
      <div style={{ position: 'absolute', top: 0, left: 0, color: 'red', zIndex: 9999 }}>DEBUG: Desktop Loaded</div>
      
      <MenuBar activeWindow={activeWindow} />
      
      <div className="relative h-full w-full pt-8 pb-20">
        {windows.map(win => (
          win.isOpen && (
            <Window 
              key={win.id}
              id={win.id}
              title={win.title}
              isMin={win.isMin}
              zIndex={win.zIndex}
              onClose={() => closeWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
              onFocus={() => focusWindow(win.id)}
            >
              {cloneElement(win.component, { onClose: () => closeWindow(win.id) })}
            </Window>
          )
        ))}
      </div>

      <Dock openWindow={openWindow} />
    </div>
  );
};

export default Desktop;
