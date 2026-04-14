import React from 'react';
import { motion } from 'framer-motion';
import { data } from '../lib/data';
import { GlassIcon } from '../components/GlassIcon';

const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
};

const AboutSection = () => {
    const aboutText = data.personal.aboutMe;
    const softSkills = data.personal.softSkills;

    return (
        <section
            id="sobre-mi"
            className="py-24 md:py-32 relative overflow-hidden"
            aria-label="Perfil Profesional y Habilidades Blandas"
        >
            <div className="max-w-6xl mx-auto px-6">

                <motion.h2
                    className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-shimmer"
                    initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    Sobre Mí
                </motion.h2>

                {/* ─── Profile Card ─── */}
                <motion.div
                    className="p-8 md:p-10 rounded-2xl glass-deep mb-16 group hover:border-primary/25 transition-all duration-500"
                    initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -3 }}
                >
                    <h3 className="text-2xl font-bold mb-4 text-primary font-mono">
                        {data.personal.name}
                    </h3>
                    <p className="text-foreground/90 leading-relaxed mb-6 text-lg max-w-3xl">
                        {aboutText}
                    </p>

                    {/* Availability badge with neon pulse */}
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full neon-pulse-badge"
                         style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
                        <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                        <span className="text-primary font-mono text-sm font-semibold tracking-wider">
                            Disponible para nuevos proyectos
                        </span>
                    </div>
                </motion.div>

                {/* ─── Soft Skills — Glass Card Layout ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className="text-xl font-bold text-center mb-8 text-foreground/80 font-mono tracking-wider uppercase">
                        Soft Skills
                    </h3>

                    <motion.div
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {softSkills.map((skill, index) => (
                            <motion.div
                                key={index}
                                className="p-5 rounded-xl glass group cursor-default
                                           hover:border-primary/25 hover:shadow-[0_0_20px_rgba(16,185,129,0.06)]
                                           transition-all duration-400"
                                variants={cardVariants}
                                whileHover={{ y: -4, scale: 1.02 }}
                            >
                                <div className="mb-3">
                                    <GlassIcon name={skill.icon} size={36} />
                                </div>
                                <p className="text-sm font-semibold text-foreground/90 group-hover:text-primary transition-colors duration-300">
                                    {skill.name}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
};

export default AboutSection;