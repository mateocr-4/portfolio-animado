import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * MateoAIBubble — Floating action button that opens the chat.
 * Pulsing neon glow with label tooltip.
 */
export const MateoAIBubble = ({ onClick }) => {
    const [showLabel, setShowLabel] = useState(true);

    // Auto-hide label after 5 seconds
    React.useEffect(() => {
        const timer = setTimeout(() => setShowLabel(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.button
            className="mateo-ai-bubble"
            onClick={onClick}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            aria-label="Abrir Mateo AI Chat"
            onMouseEnter={() => setShowLabel(true)}
            onMouseLeave={() => setShowLabel(false)}
        >
            {/* Terminal Icon */}
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#020617"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
            </svg>

            {/* Label tooltip */}
            {showLabel && (
                <motion.span
                    className="mateo-ai-bubble-label"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                >
                    💬 Mateo AI Online
                </motion.span>
            )}
        </motion.button>
    );
};
