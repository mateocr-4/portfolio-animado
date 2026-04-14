import React from 'react';
import { motion } from 'framer-motion';
import { data } from '../lib/data';

const WebsSection = () => {
    const webs = data.websRealizadas;

    return (
        <section
            id="webs"
            className="py-24 md:py-32 relative overflow-hidden"
            aria-label="Webs diseñadas y desarrolladas"
        >
            <div className="max-w-6xl mx-auto px-6">

                <motion.h2
                    className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-shimmer"
                    initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    Webs Realizadas
                </motion.h2>

                <motion.p
                    className="text-center text-muted-foreground mb-4 text-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Portfolio de sitios web diseñados y desarrollados
                </motion.p>

                {/* Counter badge */}
                <motion.div
                    className="flex justify-center mb-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-mono text-sm
                                     bg-primary/8 text-primary border border-primary/15">
                        <span className="text-lg font-extrabold">{webs.length}</span>
                        proyectos web entregados
                    </span>
                </motion.div>

                {/* Grid of 12 */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {webs.map((web, index) => (
                        <motion.a
                            key={web.name}
                            href={web.url}
                            target={web.url !== '#' ? '_blank' : undefined}
                            rel={web.url !== '#' ? 'noopener noreferrer' : undefined}
                            className="group p-5 rounded-xl glass border-transparent
                                       hover:border-primary/20 hover:shadow-[0_0_25px_rgba(16,185,129,0.06)]
                                       transition-all duration-400 cursor-pointer block"
                            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -4, scale: 1.02 }}
                        >
                            {/* Index number */}
                            <span className="text-xs font-mono text-muted-foreground/30 block mb-2">
                                {String(index + 1).padStart(2, '0')}
                            </span>

                            <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-1">
                                {web.name}
                            </h3>

                            <p className="text-xs font-mono text-muted-foreground/60">
                                {web.stack}
                            </p>

                            {/* External link indicator */}
                            {web.url !== '#' && (
                                <div className="mt-3 flex items-center gap-1 text-xs text-primary/40 group-hover:text-primary/80 transition-colors duration-300">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    <span>Ver sitio</span>
                                </div>
                            )}
                        </motion.a>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default WebsSection;
