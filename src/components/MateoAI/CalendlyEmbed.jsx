import React from 'react';
import { motion } from 'framer-motion';

/**
 * CalendlyEmbed — Opens Calendly when the agent triggers book_meeting.
 * Renders as a CTA inside the chat when matchScore > 80.
 */
export const CalendlyEmbed = ({ url }) => {
    if (!url) return null;

    const handleClick = () => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <motion.div
            className="mateo-ai-calendly"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
            <div style={{
                fontSize: '12px',
                color: '#94a3b8',
                marginBottom: '10px',
            }}>
                📅 Tu perfil encaja con mis servicios. ¡Hablemos!
            </div>

            <button
                className="mateo-ai-calendly-btn"
                onClick={handleClick}
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Agendar Videollamada
            </button>
        </motion.div>
    );
};
