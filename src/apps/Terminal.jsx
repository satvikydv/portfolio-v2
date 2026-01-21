import React, { useState, useEffect, useRef } from 'react';

const Terminal = ({ onClose }) => {
  const [history, setHistory] = useState([
    { type: 'output', content: 'Welcome to Portfolio OS v1.0.0' },
    { type: 'output', content: 'Type "help" for available commands.' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'input', content: input }];

      let output = '';
      switch (cmd) {
        case 'help':
          output = 'Available commands: help, clear, about, skills, contact, exit';
          break;
        case 'about':
          output = 'I am a passionate developer building cool things on the web.';
          break;
        case 'skills':
          output = 'React, Node.js, TypeScript, Tailwind CSS, Python';
          break;
        case 'contact':
          output = 'Email: hello@example.com';
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'exit':
        case 'quit':
          if (onClose) onClose();
          return;
        case '':
          break;
        default:
          output = `Command not found: ${cmd}`;
      }

      if (output) {
        newHistory.push({ type: 'output', content: output });
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div className="h-full bg-black/90 text-green-400 font-mono p-4 text-sm overflow-auto" onClick={() => document.getElementById('terminal-input').focus()}>
      {history.map((line, i) => (
        <div key={i} className="mb-1">
          {line.type === 'input' ? (
            <div className="flex">
              <span className="mr-2 text-blue-400">➜</span>
              <span className="mr-2 text-purple-400">~</span>
              <span>{line.content}</span>
            </div>
          ) : (
            <div className="opacity-80">{line.content}</div>
          )}
        </div>
      ))}
      <div className="flex">
        <span className="mr-2 text-blue-400">➜</span>
        <span className="mr-2 text-purple-400">~</span>
        <input
          id="terminal-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="bg-transparent outline-none flex-1 text-green-400"
          autoFocus
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default Terminal;
