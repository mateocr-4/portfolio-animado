import React, { memo } from 'react';
import { motion } from 'framer-motion';

export const ProjectCard = memo(({ project, index }) => {
    return (
        <motion.article
            className="rounded-2xl overflow-hidden glass border border-transparent group transition-all duration-500
                        hover:border-primary/20 hover:shadow-[0_0_35px_rgba(16,185,129,0.05)]"
            initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            aria-labelledby={`project-title-${project.id}`}
        >
            <div className="h-48 w-full overflow-hidden relative">
                <img
                    src={project.image}
                    alt={`Screenshot de ${project.title}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06090f] via-transparent to-transparent opacity-60" />
            </div>

            <div className="p-6">
                <h3 id={`project-title-${project.id}`}
                    className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                </h3>

                <p className="text-xs font-mono uppercase text-primary/50 mb-3 tracking-wider">{project.type}</p>
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                        <span key={tag}
                              className="text-xs font-mono px-3 py-1 bg-primary/6 text-primary/70 rounded-lg border border-primary/10
                                         group-hover:border-primary/25 group-hover:text-primary transition-all duration-300">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex flex-wrap gap-3">
                    {project.demoLink && (
                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer"
                           className="inline-block font-bold py-2 px-5 rounded-lg
                                      bg-gradient-to-r from-primary to-emerald-400 text-primary-foreground
                                      hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-300 text-sm">
                            Ver Proyecto
                        </a>
                    )}
                    {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                           className="inline-block font-bold py-2 px-5 rounded-lg border border-primary/25 text-primary
                                      hover:bg-primary/8 hover:border-primary/40 transition-all duration-300 text-sm">
                            GitHub
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
});