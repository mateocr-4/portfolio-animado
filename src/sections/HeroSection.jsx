import React from 'react';
import { motion } from 'framer-motion';
import { data } from '../lib/data';
import GradientText from '../components/GradientText';

const textVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6, staggerChildren: 0.2, delayChildren: 0.3 }
    }
};

const childVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: {
        opacity: 1, y: 0, filter: 'blur(0px)',
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
};

const HeroSection = () => {
    const fullName = data.personal.name;
    const role = data.personal.role;
    const tagline = data.personal.tagline;

    return (
        <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden pt-24">

            {/* Ambient glow orbs */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div
                    className="absolute w-[500px] h-[500px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)',
                        top: '10%', left: '15%',
                    }}
                    animate={{ x: [0, 25, -15, 0], y: [0, -20, 25, 0] }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute w-[400px] h-[400px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)',
                        bottom: '15%', right: '10%',
                    }}
                    animate={{ x: [0, -20, 15, 0], y: [0, 20, -15, 0] }}
                    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <div className="max-w-6xl mx-auto px-6 z-10 text-center">
                <motion.div variants={textVariants} initial="hidden" animate="visible">

                    {/* Role badge */}
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-sm"
                        style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}
                        variants={childVariants}
                    >
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-sm md:text-base font-mono text-primary tracking-widest uppercase">
                            {role}
                        </span>
                    </motion.div>

                    {/* Name */}
                    <motion.h1
                        className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-foreground mb-6 leading-tight"
                        variants={childVariants}
                    >
                        Hola, soy{' '}
                        <GradientText
                            colors={["#10b981", "#7c3aed", "#34d399", "#a78bfa", "#10b981"]}
                            animationSpeed={5}
                            showBorder={false}
                            className="inline-block"
                        >
                            {fullName}
                        </GradientText>
                        <span className="text-primary">.</span>
                    </motion.h1>

                    {/* Tagline */}
                    <motion.p
                        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
                        variants={childVariants}
                    >
                        {tagline}
                    </motion.p>

                    {/* CTA */}
                    <motion.a
                        href="#proyectos"
                        className="relative inline-flex items-center gap-2 py-3.5 px-9 text-lg font-bold rounded-full
                                   bg-gradient-to-r from-primary to-emerald-400 text-primary-foreground
                                   shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30
                                   transition-shadow duration-300 group"
                        variants={childVariants}
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Ver Proyectos
                        <motion.span
                            className="inline-block"
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            →
                        </motion.span>
                    </motion.a>
                </motion.div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#06090f] to-transparent z-10" />
        </section>
    );
};

export default HeroSection;