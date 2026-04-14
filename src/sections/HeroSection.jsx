import React from 'react';
import { motion } from 'framer-motion';
import GradientText from '../components/GradientText';
import { data } from '../lib/data';

// ─── Name split strategy ────────────────────────────────────────────
// "MATEO CAÑIBANO DOMÍNGUEZ" → mobile: "MATEO", sm: "MATEO CAÑIBANO", lg+: full
const nameParts  = data.personal.name.split(' ');
const firstName  = nameParts[0];
const lastName1  = nameParts[1] ?? '';
const lastName2  = nameParts.slice(2).join(' ');
// ───────────────────────────────────────────────────────────────────

const containerVariants = {
    hidden:  { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            // Reduced delay so role badge is visible almost immediately
            duration: 0.4,
            staggerChildren: 0.15,
            delayChildren: 0.05,
        },
    },
};

const itemVariants = {
    hidden:  { opacity: 0, y: 24, filter: 'blur(6px)' },
    visible: {
        opacity: 1, y: 0, filter: 'blur(0px)',
        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
};

const HeroSection = () => {
    const role    = data.personal.role;
    const tagline = data.personal.tagline;

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16"
        >
            {/* ─── Ambient glow orbs (purely decorative, no events) ─── */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute w-[600px] h-[600px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 68%)',
                        top: '5%', left: '10%',
                    }}
                    animate={{ x: [0, 30, -15, 0], y: [0, -25, 30, 0] }}
                    transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                    className="absolute w-[450px] h-[450px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 68%)',
                        bottom: '10%', right: '8%',
                    }}
                    animate={{ x: [0, -20, 15, 0], y: [0, 20, -15, 0] }}
                    transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                />
            </div>

            {/* ─── Main content ─── */}
            <div className="max-w-5xl mx-auto px-6 z-20 text-center w-full">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >

                    {/* Role badge — always visible, minimal delay */}
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-6 backdrop-blur-sm"
                        style={{
                            background: 'rgba(16,185,129,0.07)',
                            border: '1px solid rgba(16,185,129,0.2)',
                        }}
                    >
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
                        <span className="text-xs sm:text-sm font-mono text-primary tracking-widest uppercase">
                            {role}
                        </span>
                    </motion.div>

                    {/* H1 — fluid, never overflows viewport ─────────── */}
                    {/* Desktop: full name on one visual block              */}
                    {/* Tablet: first name + first surname                 */}
                    {/* Mobile: first name only — keeps it punchy          */}
                    <motion.h1
                        variants={itemVariants}
                        className="font-extrabold text-foreground leading-[1.05] mb-5"
                    >
                        {/* "Hola, soy" sub-label */}
                        <span className="block text-lg sm:text-xl md:text-2xl font-mono font-normal text-muted-foreground/55 tracking-[0.2em] mb-2">
                            Hola, soy
                        </span>

                        {/* Responsive name */}
                        <span className="text-[clamp(2.4rem,8vw,5.5rem)] leading-none inline-block">
                            <GradientText
                                colors={['#10b981', '#7c3aed', '#34d399', '#a78bfa', '#10b981']}
                                animationSpeed={5}
                                showBorder={false}
                                className="inline"
                            >
                                {/* xs / mobile */}
                                <span className="sm:hidden whitespace-nowrap">{firstName}</span>
                                {/* sm → lg */}
                                <span className="hidden sm:inline xl:hidden whitespace-nowrap">
                                    {firstName} {lastName1}
                                </span>
                                {/* xl+ */}
                                <span className="hidden xl:inline whitespace-nowrap">
                                    {firstName} {lastName1}{lastName2 ? ` ${lastName2}` : ''}
                                </span>
                            </GradientText>
                            <span className="text-primary">.</span>
                        </span>
                    </motion.h1>

                    {/* Tagline */}
                    <motion.p
                        variants={itemVariants}
                        className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
                    >
                        {tagline}
                    </motion.p>

                    {/* CTA — z-30 ensures it sits above every overlay */}
                    <motion.a
                        href="#proyectos"
                        variants={itemVariants}
                        className="relative z-30 inline-flex items-center gap-2 py-3.5 px-9 text-base sm:text-lg font-bold rounded-full
                                   bg-gradient-to-r from-primary to-emerald-400 text-primary-foreground
                                   shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40
                                   transition-shadow duration-300 cursor-pointer select-none"
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={(e) => {
                            // Smooth scroll fallback for browsers that don't support anchor nav
                            e.preventDefault();
                            document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Ver Proyectos
                        <motion.span
                            className="inline-block"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            →
                        </motion.span>
                    </motion.a>

                </motion.div>
            </div>

            {/* ─── Bottom gradient — DECORATIVE ONLY, never blocks events ─── */}
            <div
                className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#06090f] to-transparent z-10 pointer-events-none"
            />
        </section>
    );
};

export default HeroSection;