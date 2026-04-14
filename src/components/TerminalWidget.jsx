import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const TerminalWidget = ({ activeProject }) => {
    const [lines, setLines] = useState([]);
    
    useEffect(() => {
        if (!activeProject || !activeProject.terminalOutput) {
            setLines([{ text: "> root@mcd-portfolio:~# Waiting for input...", type: "system" }]);
            return;
        }

        setLines([]);
        
        let currentLine = 0;
        let isCancelled = false;

        const renderOutputs = async () => {
            const outputs = activeProject.terminalOutput;
            
            for (let i = 0; i < outputs.length; i++) {
                if (isCancelled) return;
                
                // Add command line
                setLines(prev => [...prev, { text: `> ${outputs[i].cmd}`, type: "command" }]);
                
                // Simulate typing delay
                await new Promise(resolve => setTimeout(resolve, 600));
                
                if (isCancelled) return;
                
                // Add output lines
                const outputStr = outputs[i].output;
                const outputLines = outputStr.split('\n');
                
                for (let j = 0; j < outputLines.length; j++) {
                    setLines(prev => [...prev, { text: outputLines[j], type: "output" }]);
                    await new Promise(resolve => setTimeout(resolve, 200));
                }
                
                await new Promise(resolve => setTimeout(resolve, 400));
            }
            
            if (!isCancelled) {
                setLines(prev => [...prev, { text: "> root@mcd-portfolio:~# ", type: "system", cursor: true }]);
            }
        };

        renderOutputs();

        return () => {
            isCancelled = true;
        };
    }, [activeProject]);

    return (
        <div className="w-full max-w-lg rounded-xl overflow-hidden shadow-2xl bg-[#0d1117] border border-[#30363d] font-mono text-sm h-[320px] flex flex-col">
            {/* Header */}
            <div className="bg-[#161b22] px-4 py-2 border-b border-[#30363d] flex items-center gap-2">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <div className="flex-1 text-center text-[#8b949e] text-xs font-semibold">
                    user@mcd-terminal:~
                </div>
            </div>

            {/* Output */}
            <div className="p-4 flex-1 overflow-y-auto text-left custom-scrollbar">
                <AnimatePresence>
                    {lines.map((line, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mb-1"
                        >
                            {line.type === "command" && (
                                <span className="text-[#58a6ff]">{line.text}</span>
                            )}
                            {line.type === "output" && (
                                <span className="text-[#c9d1d9]">{line.text}</span>
                            )}
                            {line.type === "system" && (
                                <span className="text-[#7ee787]">
                                    {line.text}
                                    {line.cursor && (
                                        <motion.span
                                            animate={{ opacity: [1, 0] }}
                                            transition={{ repeat: Infinity, duration: 0.8 }}
                                            className="inline-block w-2 h-4 bg-[#7ee787] align-middle ml-1"
                                        />
                                    )}
                                </span>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            {/* Custom Scrollbar CSS for this specific terminal */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #0d1117; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #30363d; border-radius: 4px; }
            `}</style>
        </div>
    );
};
