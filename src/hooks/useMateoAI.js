import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * useMateoAI — Custom hook for managing the Mateo AI chat state.
 * Handles: messages, session, typing animation, match score, and tool actions.
 */

const API_BASE = import.meta.env.VITE_MATEO_AI_API || '/api/v1';

const WELCOME_MESSAGE = {
    role: 'assistant',
    content: '¡Hola! Soy Mateo, Data-Driven Developer & Growth Analyst. 👋\n\nPuedo contarte sobre mi experiencia técnica, mis proyectos, o directamente analizar cómo puedo ayudarte con tu próximo reto.\n\n¿Por dónde quieres empezar?',
    timestamp: Date.now(),
};

const QUICK_PROMPTS = [
    '¿Qué tecnologías dominas?',
    '¿Cuál ha sido tu mejor proyecto?',
    '¿Cómo puedes ayudar a mi negocio?',
    'Quiero agendar una llamada',
];

export function useMateoAI() {
    const [messages, setMessages] = useState([WELCOME_MESSAGE]);
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const [matchScore, setMatchScore] = useState(0);
    const [buyerPersona, setBuyerPersona] = useState(null);
    const [leadCard, setLeadCard] = useState(null);
    const [actions, setActions] = useState([]);
    const [error, setError] = useState(null);

    const messagesEndRef = useRef(null);
    const abortControllerRef = useRef(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    /**
     * Send a message to the Mateo AI backend
     */
    const sendMessage = useCallback(async (text) => {
        if (!text.trim() || isTyping) return;

        setError(null);

        // Add user message immediately
        const userMsg = {
            role: 'user',
            content: text.trim(),
            timestamp: Date.now(),
        };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        // Cancel any pending request
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    session_id: sessionId,
                    message: text.trim(),
                    user_meta: {
                        page: window.location.pathname,
                        referrer: document.referrer,
                        device: window.innerWidth < 768 ? 'mobile' : 'desktop',
                    },
                }),
                signal: abortControllerRef.current.signal,
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            // Update session
            if (data.session_id) setSessionId(data.session_id);
            if (data.match_score !== undefined) setMatchScore(data.match_score);
            if (data.buyer_persona) setBuyerPersona(data.buyer_persona);
            if (data.lead_card) setLeadCard(data.lead_card);
            if (data.actions?.length) setActions(prev => [...prev, ...data.actions]);

            // Add AI response with typewriter delay
            await typewriterDelay(data.response.length);

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.response,
                timestamp: Date.now(),
                matchScore: data.match_score,
                buyerPersona: data.buyer_persona,
            }]);

        } catch (err) {
            if (err.name === 'AbortError') return;

            console.error('Mateo AI error:', err);
            setError('Error de conexión. Intentando de nuevo...');

            // Fallback: show a mock response
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Disculpa, estoy teniendo un problema técnico temporal. ¿Puedes intentar de nuevo?',
                timestamp: Date.now(),
                isError: true,
            }]);
        } finally {
            setIsTyping(false);
        }
    }, [sessionId, isTyping]);

    /**
     * Simulate typing delay proportional to response length
     */
    const typewriterDelay = (length) => {
        const baseMs = 400;
        const perCharMs = 3;
        const delay = Math.min(baseMs + length * perCharMs, 2000);
        return new Promise(resolve => setTimeout(resolve, delay));
    };

    /**
     * Toggle chat open/closed
     */
    const toggle = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    /**
     * Generate strategy summary
     */
    const generateSummary = useCallback(async () => {
        if (!sessionId) return null;
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/chat/summary`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ session_id: sessionId }),
            });
            return await res.json();
        } catch (err) {
            console.error('Summary generation failed:', err);
            return null;
        }
    }, [sessionId]);

    return {
        // State
        messages,
        isOpen,
        isTyping,
        sessionId,
        matchScore,
        buyerPersona,
        leadCard,
        actions,
        error,
        quickPrompts: QUICK_PROMPTS,

        // Refs
        messagesEndRef,

        // Actions
        sendMessage,
        toggle,
        generateSummary,
    };
}
