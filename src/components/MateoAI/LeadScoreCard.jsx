import React from 'react';
import { motion } from 'framer-motion';

/**
 * LeadScoreCard — 3D glassmorphism card showing lead qualification.
 * Appears when matchScore >= 40.
 */
export const LeadScoreCard = ({ score, persona, signals, breakdown }) => {
    const getScoreTier = (s) => {
        if (s >= 80) return { label: 'HOT LEAD', className: 'lead-score-badge--high' };
        if (s >= 60) return { label: 'WARM LEAD', className: 'lead-score-badge--medium' };
        return { label: 'EXPLORING', className: 'lead-score-badge--low' };
    };

    const tier = getScoreTier(score);

    return (
        <motion.div
            className="lead-score-card"
            initial={{ opacity: 0, y: 10, rotateX: -5 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
            <div className="lead-score-header">
                <div>
                    <span className={`lead-score-badge ${tier.className}`}>
                        {tier.label}
                    </span>
                    {persona && (
                        <div style={{
                            fontSize: '11px',
                            color: '#94a3b8',
                            marginTop: '4px',
                        }}>
                            Match: {persona}
                        </div>
                    )}
                </div>
                <motion.span
                    className="lead-score-number"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
                >
                    {score}
                </motion.span>
            </div>

            {/* Score bar */}
            <div
                className="lead-score-bar"
                style={{ width: `${score}%` }}
            />

            {/* Breakdown */}
            {breakdown && (
                <div style={{
                    display: 'flex',
                    gap: '12px',
                    marginTop: '10px',
                    fontSize: '10px',
                    color: '#64748b',
                }}>
                    {breakdown.role_match > 0 && (
                        <span>Rol: {breakdown.role_match}pts</span>
                    )}
                    {breakdown.intent_match > 0 && (
                        <span>Intención: {breakdown.intent_match}pts</span>
                    )}
                    {breakdown.engagement > 0 && (
                        <span>Engagement: {breakdown.engagement}pts</span>
                    )}
                </div>
            )}

            {/* Signals */}
            {signals && signals.length > 0 && (
                <ul className="lead-score-signals" style={{ marginTop: '8px' }}>
                    {signals.slice(0, 3).map((signal, i) => (
                        <li key={i} className="lead-score-signal">
                            {signal}
                        </li>
                    ))}
                </ul>
            )}
        </motion.div>
    );
};
