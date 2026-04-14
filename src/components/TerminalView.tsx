import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalViewProps {
  projectName?: string;
}

export const TerminalView: React.FC<TerminalViewProps> = ({ projectName = 'portfolio' }) => {
  const [lines, setLines] = useState<string[]>([]);
  
  useEffect(() => {
    const sequence = [
      `$ git clone https://github.com/tu-usuario/${projectName}.git`,
      `> Cloning into '${projectName}'...`,
      `$ cd ${projectName}`,
      `$ npm install`,
      `> Installing dependencies... 🔨`,
      `> Added 142 packages, and audited 143 packages in 3s`,
      `$ npm run dev`,
      `> VITE v5.0.0 ready in 340 ms`,
      `> ➜  Local:   http://localhost:5173/`,
      `> ➜  Network: use --host to expose`,
    ];

    let currentIndex = 0;
    setLines([]); // Reset lines when project changes

    const interval = setInterval(() => {
      if (currentIndex < sequence.length) {
        setLines(prev => [...prev, sequence[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 800); // 800ms delays to simulate typing/installing

    return () => clearInterval(interval);
  }, [projectName]);

  return (
    <div className="w-full max-w-2xl bg-black rounded-lg overflow-hidden border border-gray-800 font-mono text-sm shadow-2xl">
      <div className="flex items-center px-4 py-2 bg-gray-900 border-b border-gray-800">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="ml-4 text-gray-400 text-xs">bash - {projectName}</div>
      </div>
      <div className="p-4 h-64 overflow-y-auto bg-black text-green-400">
        <AnimatePresence>
          {lines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-1 ${line.startsWith('$') ? 'text-blue-400' : 'text-gray-300'}`}
            >
              {line}
            </motion.div>
          ))}
          {lines.length < 10 && (
            <motion.div 
              animate={{ opacity: [1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-4 bg-gray-400"
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
