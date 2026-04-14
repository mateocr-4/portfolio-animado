import React from 'react';
import { motion } from 'framer-motion';
import GradientText from '../components/GradientText';
import Magnet from '../components/reactbits/Magnet';
import SplitText from '../components/reactbits/SplitText';
import { data } from '../lib/data';

// ─── Animation variants ─────────────────────────────────────────────
const containerVariants = {
    hidden:  { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.3, staggerChildren: 0.12, delayChildren: 0.05 },
    },
};

const itemVariants = {
    hidden:  { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: {
        opacity: 1, y: 0, filter: 'blur(0px)',
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
};

const HeroSection = () => {
    const { name, role, tagline } = data.personal;

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16"
        >
            {/* ─── Ambient glow orbs ─── */}
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
                    {/* Role badge */}
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8 backdrop-blur-sm"
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

                    {/* H1 — fluid with GradientText */}
                    <motion.h1
                        variants={itemVariants}
                        className="font-extrabold text-foreground leading-[1.05] mb-6"
                    >
                        <span className="block text-lg sm:text-xl md:text-2xl font-mono font-normal text-muted-foreground/55 tracking-[0.2em] mb-2">
                            Hola, soy
                        </span>
                        <span className="text-[clamp(2.8rem,9vw,6rem)] leading-none inline-block">
                            <GradientText
                                colors={['#10b981', '#7c3aed', '#34d399', '#a78bfa', '#10b981']}
                                animationSpeed={5}
                                showBorder={false}
                                className="inline"
                            >
                                {name}
                            </GradientText>
                            <span className="text-primary">.</span>
                        </span>
                    </motion.h1>

                    {/* Tagline — animated with SplitText from ReactBits */}
                    <motion.div variants={itemVariants} className="mb-12">
                        <SplitText
                            text={tagline}
                            splitBy="words"
                            delay={60}
                            duration={0.5}
                            from={{ opacity: 0, y: 15, filter: 'blur(3px)' }}
                            to={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed"
                            tag="p"
                        />
                    </motion.div>

                    {/* CTA — Magnet effect from ReactBits + guaranteed clickability */}
                    <motion.div variants={itemVariants} className="relative z-30">
                        <Magnet padding={60} magnetStrength={3}>
                            <button
                                onClick={() => {
                                    document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="inline-flex items-center gap-2 py-3.5 px-10 text-base sm:text-lg font-bold rounded-full
                                           bg-gradient-to-r from-primary to-emerald-400 text-primary-foreground
                                           shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40
                                           transition-all duration-300 cursor-pointer select-none
                                           hover:brightness-110 active:scale-95"
                                aria-label="Ver sección de proyectos"
                            >
                                Ver Proyectos
                                <motion.span
                                    className="inline-block"
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    →
                                </motion.span>
                            </button>
                        </Magnet>
                    </motion.div>

                </motion.div>
            </div>

            {/* Bottom gradient — NEVER blocks events */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#06090f] to-transparent z-10 pointer-events-none" />
        </section>
    );
};

export default HeroSection;