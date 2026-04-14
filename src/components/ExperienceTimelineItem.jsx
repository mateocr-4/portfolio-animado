import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase } from 'react-icons/fa';

export const ExperienceTimelineItem = memo(({ experience, index = 0 }) => {
    return (
        <motion.div
            className="relative pl-12 pb-8 border-l border-primary/12"
            initial={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-[#06090f] border-2 border-primary/30 flex items-center justify-center
                            shadow-[0_0_10px_rgba(16,185,129,0.12)]">
                <FaBriefcase className="text-primary text-[8px]" />
            </div>

            <motion.div
                className="p-6 rounded-xl glass hover:border-primary/20 transition-all duration-500 group"
                whileHover={{ y: -3, boxShadow: '0 0 25px rgba(16,185,129,0.04)' }}
            >
                <p className="text-sm font-mono text-primary/50 mb-1">
                    {experience.period}
                </p>
                <h3 className="text-xl font-bold text-primary mb-1 group-hover:text-emerald-300 transition-colors duration-300">
                    {experience.role}
                </h3>
                <p className="text-lg font-semibold text-foreground/70 mb-3">
                    @ {experience.company}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                    {experience.description}
                </p>
            </motion.div>
        </motion.div>
    );
});

ExperienceTimelineItem.displayName = 'ExperienceTimelineItem';