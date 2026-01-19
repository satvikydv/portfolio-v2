import React from 'react';
import { motion } from 'framer-motion';
import { Folder, Globe, Mail, Terminal as TerminalIcon } from 'lucide-react';
import Finder from '../../apps/Finder';
import Safari from '../../apps/Safari';
import MailApp from '../../apps/Mail';
import TerminalApp from '../../apps/Terminal';

const Dock = ({ openWindow }) => {
  const apps = [
    { id: 'finder', title: 'Finder', icon: <Folder className="w-8 h-8 text-blue-500 fill-current" />, component: <Finder /> },
    { id: 'safari', title: 'Safari', icon: <Globe className="w-8 h-8 text-blue-400" />, component: <Safari /> },
    { id: 'mail', title: 'Mail', icon: <Mail className="w-8 h-8 text-blue-600" />, component: <MailApp /> },
    { id: 'terminal', title: 'Terminal', icon: <TerminalIcon className="w-8 h-8 text-gray-800" />, component: <TerminalApp /> },
  ];

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-end gap-2 px-4 py-2 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
        {apps.map((app) => (
          <motion.button
            key={app.id}
            whileHover={{ scale: 1.2, y: -10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => openWindow(app.id, app.title, app.component)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/30 transition-colors relative group"
          >
            {app.icon}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {app.title}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Dock;
