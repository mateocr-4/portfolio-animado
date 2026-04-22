import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMateoAI } from '../../hooks/useMateoAI';
import { MateoAIBubble } from './MateoAIBubble';
import { LeadScoreCard } from './LeadScoreCard';
import { CalendlyEmbed } from './CalendlyEmbed';
import './MateoAI.css';

/**
 * MateoAIChat — Terminal-Glassmorphism floating chat widget.
 * The heart of the Mateo AI Digital Twin UI.
 */
export const MateoAIChat = () => {
    const {
        messages,
        isOpen,
        isTyping,
        matchScore,
        buyerPersona,
        leadCard,
        actions,
        quickPrompts,
        messagesEndRef,
        sendMessage,
        toggle,
        error,
    } = useMateoAI();

    const [input, setInput] = useState('');
    const inputRef = useRef(null);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        sendMessage(input);
        setInput('');
    };

    const handleQuickPrompt = (prompt) => {
        sendMessage(prompt);
    };

    // Check if Calendly action was triggered
    const calendlyAction = actions.find(a => a.type === 'book_meeting');

    // Parse markdown bold (**text**) in messages
    const formatMessage = (text) => {
        return text.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i}>{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    return (
        <>
            {/* Floating Bubble (visible when chat is closed) */}
            <AnimatePresence>
                {!isOpen && (
                    <MateoAIBubble onClick={toggle} />
                )}
            </AnimatePresence>

            {/* Chat Widget */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="mateo-ai-chat"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 25,
                        }}
                    >
                        {/* Header */}
                        <div className="mateo-ai-header" onClick={toggle}>
                            <div className="mateo-ai-dots">
                                <span className="mateo-ai-dot mateo-ai-dot--red" />
                                <span className="mateo-ai-dot mateo-ai-dot--yellow" />
                                <span className="mateo-ai-dot mateo-ai-dot--green" />
                            </div>
                            <span className="mateo-ai-header-title">
                                mateo@ai:~$
                            </span>
                            <span className="mateo-ai-header-status">
                                Online
                            </span>
                        </div>

                        {/* Messages Area */}
                        <div className="mateo-ai-messages">
                            {/* Welcome chips (only show if no user messages yet) */}
                            {messages.length <= 1 && (
                                <div className="mateo-ai-welcome">
                                    <span className="mateo-ai-welcome-name">
                                        Mateo AI
                                    </span>
                                    Digital Twin & Growth Engine
                                    <div className="mateo-ai-welcome-chips">
                                        {quickPrompts.map((prompt, i) => (
                                            <button
                                                key={i}
                                                className="mateo-ai-chip"
                                                onClick={() => handleQuickPrompt(prompt)}
                                            >
                                                {prompt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Messages */}
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: idx === messages.length - 1 ? 0.1 : 0 }}
                                    className={`mateo-ai-msg mateo-ai-msg--${msg.role === 'user' ? 'user' : 'ai'}`}
                                >
                                    {msg.content.split('\n').map((line, i) => (
                                        <span key={i}>
                                            {formatMessage(line)}
                                            {i < msg.content.split('\n').length - 1 && <br />}
                                        </span>
                                    ))}
                                </motion.div>
                            ))}

                            {/* Lead Score Card */}
                            {leadCard && matchScore >= 40 && (
                                <LeadScoreCard
                                    score={matchScore}
                                    persona={buyerPersona}
                                    signals={leadCard.signals}
                                    breakdown={leadCard.score_breakdown}
                                />
                            )}

                            {/* Calendly Embed */}
                            {calendlyAction && (
                                <CalendlyEmbed url={calendlyAction.data.calendly_url} />
                            )}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <div className="mateo-ai-typing">
                                    <span className="mateo-ai-typing-dot" />
                                    <span className="mateo-ai-typing-dot" />
                                    <span className="mateo-ai-typing-dot" />
                                </div>
                            )}

                            {/* Error */}
                            {error && (
                                <div className="mateo-ai-msg mateo-ai-msg--system">
                                    ⚠️ {error}
                                </div>
                            )}

                            {/* Scroll anchor */}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form className="mateo-ai-input-area" onSubmit={handleSubmit}>
                            <span className="mateo-ai-input-prompt">›</span>
                            <input
                                ref={inputRef}
                                type="text"
                                className="mateo-ai-input"
                                placeholder="Escribe algo..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isTyping}
                                maxLength={2000}
                                autoComplete="off"
                            />
                            <button
                                type="submit"
                                className="mateo-ai-send"
                                disabled={!input.trim() || isTyping}
                                aria-label="Enviar mensaje"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
