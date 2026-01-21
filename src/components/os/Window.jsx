import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Window = ({ id, title, children, isMin, zIndex, onClose, onMinimize, onFocus }) => {
  const [size, setSize] = useState({ width: 800, height: 500 });
  const [position, setPosition] = useState({ x: 100 + Math.random() * 100, y: 60 + Math.random() * 50 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [prevState, setPrevState] = useState(null);
  const windowRef = useRef(null);
  const isDragging = useRef(false);
  const isResizing = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  if (isMin) return null;

  const handleMaximize = (e) => {
    e.stopPropagation();
    if (isMaximized) {
      // Restore to previous size
      if (prevState) {
        setSize(prevState.size);
        setPosition(prevState.position);
      }
      setIsMaximized(false);
    } else {
      // Save current state and maximize
      setPrevState({ size, position });
      setSize({ width: window.innerWidth, height: window.innerHeight - 100 });
      setPosition({ x: 0, y: 32 });
      setIsMaximized(true);
    }
  };

  const handleDragStart = (e) => {
    if (isMaximized) return;
    e.preventDefault();
    isDragging.current = true;
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
    
    const handleMouseMove = (moveEvent) => {
      if (!isDragging.current) return;
      const newX = moveEvent.clientX - dragOffset.current.x;
      const newY = Math.max(32, moveEvent.clientY - dragOffset.current.y); // Don't go above menubar
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleResizeStart = (e, direction) => {
    if (isMaximized) return;
    e.preventDefault();
    e.stopPropagation();
    isResizing.current = true;
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;
    const startPosX = position.x;
    const startPosY = position.y;

    const handleMouseMove = (moveEvent) => {
      if (!isResizing.current) return;
      
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startPosX;
      let newY = startPosY;

      if (direction.includes('e')) {
        newWidth = Math.max(400, startWidth + deltaX);
      }
      if (direction.includes('w')) {
        const potentialWidth = startWidth - deltaX;
        if (potentialWidth >= 400) {
          newWidth = potentialWidth;
          newX = startPosX + deltaX;
        }
      }
      if (direction.includes('s')) {
        newHeight = Math.max(300, startHeight + deltaY);
      }
      if (direction.includes('n')) {
        const potentialHeight = startHeight - deltaY;
        if (potentialHeight >= 300) {
          newHeight = potentialHeight;
          newY = startPosY + deltaY;
        }
      }

      setSize({ width: newWidth, height: newHeight });
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      isResizing.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <motion.div
      ref={windowRef}
      onMouseDown={onFocus}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed bg-[#1e1e1e]/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 flex flex-col overflow-hidden"
      style={{ 
        zIndex,
        width: size.width,
        height: size.height,
        left: position.x,
        top: position.y,
        ...(isMaximized && { borderRadius: 0 })
      }}
    >
      {/* Window Header - Draggable Area */}
      <div 
        className="h-10 bg-white/5 flex items-center px-4 justify-between select-none cursor-grab active:cursor-grabbing"
        onMouseDown={handleDragStart}
      >
        <div className="flex gap-2 group" onMouseDown={(e) => e.stopPropagation()}>
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
          >
            <X className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center transition-colors"
          >
            <Minus className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            onClick={handleMaximize}
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors"
          >
            <Maximize2 className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
          </button>
        </div>
        <span className="text-sm font-medium text-gray-400 pointer-events-none">{title}</span>
        <div className="w-14" />
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto text-gray-200">
        {children}
      </div>

      {/* Resize Handles */}
      {!isMaximized && (
        <>
          {/* Right edge */}
          <div 
            className="absolute top-10 right-0 w-2 h-[calc(100%-10px)] cursor-ew-resize"
            onMouseDown={(e) => handleResizeStart(e, 'e')}
          />
          {/* Bottom edge */}
          <div 
            className="absolute bottom-0 left-2 w-[calc(100%-4px)] h-2 cursor-ns-resize"
            onMouseDown={(e) => handleResizeStart(e, 's')}
          />
          {/* Left edge */}
          <div 
            className="absolute top-10 left-0 w-2 h-[calc(100%-10px)] cursor-ew-resize"
            onMouseDown={(e) => handleResizeStart(e, 'w')}
          />
          {/* Bottom-right corner */}
          <div 
            className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
            onMouseDown={(e) => handleResizeStart(e, 'se')}
          />
          {/* Bottom-left corner */}
          <div 
            className="absolute bottom-0 left-0 w-4 h-4 cursor-nesw-resize"
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
          />
        </>
      )}
    </motion.div>
  );
};

export default Window;
