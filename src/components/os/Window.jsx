import React from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Window = ({ id, title, children, isMin, zIndex, onClose, onMinimize, onFocus }) => {
  if (isMin) return null;

  return (
    <motion.div
      onMouseDown={onFocus}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="absolute top-20 left-20 w-[800px] h-[500px] bg-[#1e1e1e]/90 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 flex flex-col overflow-hidden"
      style={{ zIndex }}
    >
      {/* Window Header */}
      <div className="window-header h-10 bg-white/5 flex items-center px-4 justify-between select-none">
        <div className="flex gap-2 group">
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center"
          >
            <X className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center"
          >
            <Minus className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center"
          >
            <Maximize2 className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
          </button>
        </div>
        <span className="text-sm font-medium text-gray-400">{title}</span>
        <div className="w-14" /> {/* Spacer for centering */}
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto p-4 text-gray-200">
        {children}
      </div>
    </motion.div>
  );
};

export default Window;
