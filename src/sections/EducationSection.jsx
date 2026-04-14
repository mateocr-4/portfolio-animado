import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';
import { data } from '../lib/data';

const EducationTimelineItem = memo(({ education, index = 0 }) => {
    return (
        <motion.div
            className="relative pl-12 pt-2"
            initial={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-[#06090f] border-2 border-secondary/35 flex items-center justify-center
                            shadow-[0_0_10px_rgba(124,58,237,0.12)]">
                <FaGraduationCap className="text-secondary text-[8px]" />
            </div>

            <motion.div
                className="p-5 rounded-xl glass hover:border-secondary/20 transition-all duration-500 group"
                whileHover={{ y: -3, boxShadow: '0 0 25px rgba(124,58,237,0.04)' }}
            >
                <p className="text-sm font-mono text-secondary/50 mb-1">{education.period}</p>
                <h3 className="text-xl font-extrabold text-foreground mb-1 group-hover:text-secondary transition-colors duration-300">
                    {education.degree}
                </h3>
                <h4 className="text-md font-semibold text-primary mb-3">{education.institution}</h4>
                <p className="text-sm text-muted-foreground">{education.description}</p>
            </motion.div>
        </motion.div>
    );
});

EducationTimelineItem.displayName = 'EducationTimelineItem';

const EducationSection = () => {
    return (
        <section id="educacion" className="py-24 md:py-32 relative overflow-hidden"
                 aria-label="Sección de Educación y Formación Académica">
            <div className="max-w-4xl mx-auto px-6">

                <motion.h2
                    className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-shimmer"
                    initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    Formación Académica
                </motion.h2>

                <motion.p
                    className="text-center text-muted-foreground mb-16 text-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Base formativa multidisciplinar
                </motion.p>

                <div className="space-y-12 border-l border-secondary/12 ml-3">
                    {data.education.map((edu, index) => (
                        <EducationTimelineItem key={index} education={edu} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default EducationSection;