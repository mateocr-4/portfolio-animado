import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookMarked, Star, CircleDot } from 'lucide-react';

export const GitHubProjectCard = ({ project, onHover, index }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onMouseEnter={() => onHover(project)}
            onFocus={() => onHover(project)}
            onClick={() => navigate(`/project/${project.id}`)}
            className="group cursor-pointer rounded-xl bg-background border border-primary/20 p-5 
                       hover:border-primary/50 hover:bg-primary/5 transition-all duration-300
                       relative overflow-hidden flex flex-col h-full"
        >
            {/* Github Header */}
            <div className="flex items-center gap-2 mb-3">
                <BookMarked className="w-4 h-4 text-primary" />
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    <span className="text-primary/70">{project.repository?.split('/')[0] || 'mateocanibano'} / </span> 
                    {project.repository?.split('/')[1] || project.id}
                </h3>
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full border border-primary/30 text-primary/70">
                    Public
                </span>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-6 line-clamp-2 flex-grow">
                {project.description}
            </p>

            {/* Footer Metadata */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                {project.language && (
                    <div className="flex items-center gap-1.5">
                        <span 
                            className="w-3 h-3 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)]" 
                            style={{ backgroundColor: project.languageColor || '#fff' }}
                        ></span>
                        <span>{project.language}</span>
                    </div>
                )}
                
                {project.stars && (
                    <div className="flex items-center gap-1 hover:text-primary transition-colors">
                        <Star className="w-3.5 h-3.5" />
                        <span>{project.stars}</span>
                    </div>
                )}

                {project.lastUpdated && (
                    <div className="flex items-center gap-1 ml-auto">
                        <CircleDot className="w-3 h-3 text-muted-foreground/60" />
                        <span className="truncate max-w-[100px]">Updated {project.lastUpdated}</span>
                    </div>
                )}
            </div>

            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 z-[-1] bg-gradient-to-tr from-primary/0 to-primary/0 group-hover:from-primary/5 transition-all duration-500"></div>
        </motion.div>
    );
};
