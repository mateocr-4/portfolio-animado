import React from 'react';
import { motion } from 'framer-motion';
import { data } from '../lib/data';
import { ExperienceTimelineItem } from '../components/ExperienceTimelineItem';

const ExperienceSection = () => {
    return (
        <section id="experiencia" className="py-24 md:py-32 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6">

                <motion.h2
                    className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-shimmer"
                    initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    Experiencia Laboral
                </motion.h2>

                <motion.p
                    className="text-center text-muted-foreground mb-16 text-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Trayectoria profesional en desarrollo y analítica
                </motion.p>

                <div className="space-y-12">
                    {data.experience.map((item, index) => (
                        <ExperienceTimelineItem key={index} experience={item} index={index} />
                    ))}

                    <motion.div
                        className="relative pl-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-[#06090f] border-2 border-primary/15">
                            <div className="w-2 h-2 rounded-full bg-primary/25 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        </div>
                        <p className="pt-2 text-sm font-mono text-muted-foreground/40">Inicio de la cronología profesional</p>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default ExperienceSection;