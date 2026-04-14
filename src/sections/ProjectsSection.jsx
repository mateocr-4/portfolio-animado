import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GitHubProjectCard } from '../components/GitHubProjectCard';
import { TerminalWidget } from '../components/TerminalWidget';
import { supabase } from '../lib/supabaseClient';

const ProjectsSection = () => {
    const [selectedTag, setSelectedTag] = useState("All");
    const [activeProject, setActiveProject] = useState(null);
    const [projects, setProjects] = useState([]);
    
    // Slider State
    const [colIndex, setColIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchProjects = async () => {
            const { data } = await supabase.from('projects').select('*');
            if(data) {
                const sorted = [...data].sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                setProjects(sorted);
            }
        };
        fetchProjects();
    }, []);

    const allTags = useMemo(() => {
        return ["All", ...new Set(projects.flatMap(p => p.hardskills || []))].slice(0, 8);
    }, [projects]);

    const filteredProjects = useMemo(() => {
        if (selectedTag === "All") return projects;
        return projects.filter(p => (p.hardskills || []).includes(selectedTag));
    }, [selectedTag, projects]);

    // Data Logic: Blocks of 3
    const projectColumns = useMemo(() => {
        const cols = [];
        for (let i = 0; i < filteredProjects.length; i += 3) {
            cols.push(filteredProjects.slice(i, i + 3));
        }
        return cols;
    }, [filteredProjects]);

    // Resets slider when changing tags
    useEffect(() => {
        setColIndex(0);
    }, [selectedTag]);

    const maxColsVisible = isMobile ? 1 : 2;
    const maxIndex = Math.max(0, projectColumns.length - maxColsVisible);

    const nextCol = () => setColIndex(prev => Math.min(prev + 1, maxIndex));
    const prevCol = () => setColIndex(prev => Math.max(prev - 1, 0));

    const getXOffset = () => {
        if (isMobile) {
            return `calc(-${colIndex * 100}% - ${colIndex * 24}px)`;
        } else {
            return `calc(-${colIndex * 50}% - ${colIndex * 12}px)`;
        }
    };

    return (
        <section
            id="proyectos"
            className="py-24 md:py-32 relative overflow-hidden bg-background"
            aria-label="Proyectos de Desarrollo y Tech Hub"
        >
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-shimmer">
                        Tech-Hub & Proyectos
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Explora la arquitectura técnica y el despliegue de mis trabajos más recientes.
                        Pasa el cursor sobre los repositorios para analizar el código.
                    </p>
                </motion.div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300
                                       ${selectedTag === tag 
                                        ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(16,185,129,0.4)] border-primary' 
                                        : 'bg-transparent text-muted-foreground border border-primary/20 hover:border-primary/50 hover:text-foreground'}`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* 2-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    
                    {/* Left Column: Terminal Widget (Sticky) */}
                    <div className="lg:col-span-5 lg:sticky lg:top-32 order-2 lg:order-1 perspective-1000">
                        <TerminalWidget activeProject={activeProject} />
                        
                        <div className="mt-8 text-center lg:text-left text-sm text-muted-foreground">
                            <p className="flex items-center justify-center lg:justify-start gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                Sistemas operativos. Conexión segura.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Sliding Project Cards Grid */}
                    <div className="lg:col-span-7 order-1 lg:order-2 relative group min-h-[500px]">
                        
                        {/* Desktop Navigation Arrows (Floating) */}
                        {maxIndex > 0 && (
                            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-20 flex justify-between pointer-events-none px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button 
                                    onClick={prevCol}
                                    disabled={colIndex === 0}
                                    className="pointer-events-auto bg-[#0a1220]/90 backdrop-blur-md border border-primary/30 p-2.5 rounded-full text-primary disabled:opacity-0 transition-all hover:bg-primary/20 hover:scale-110 shadow-[0_0_20px_rgba(16,185,129,0.3)] -ml-4"
                                >
                                    <ChevronLeft size={28} />
                                </button>
                                <button 
                                    onClick={nextCol}
                                    disabled={colIndex === maxIndex}
                                    className="pointer-events-auto bg-[#0a1220]/90 backdrop-blur-md border border-primary/30 p-2.5 rounded-full text-primary disabled:opacity-0 transition-all hover:bg-primary/20 hover:scale-110 shadow-[0_0_20px_rgba(16,185,129,0.3)] -mr-4"
                                >
                                    <ChevronRight size={28} />
                                </button>
                            </div>
                        )}

                        <div className="w-full relative overflow-hidden pb-4">
                            <motion.div 
                                className="flex w-full will-change-transform"
                                style={{ gap: '24px' }}
                                animate={{ x: getXOffset() }}
                                transition={{ type: "spring", stiffness: 250, damping: 28, mass: 0.8 }}
                            >
                                <AnimatePresence mode="popLayout">
                                    {projectColumns.length > 0 ? projectColumns.map((col, idx) => (
                                        <div 
                                            key={`col-${idx}`} 
                                            className="flex-shrink-0 flex flex-col gap-6"
                                            style={{ width: isMobile ? '100%' : 'calc(50% - 12px)' }}
                                        >
                                            {col.map((project, pIdx) => (
                                                <GitHubProjectCard 
                                                    key={project.id} 
                                                    project={project} 
                                                    index={pIdx} 
                                                    onHover={setActiveProject} 
                                                />
                                            ))}
                                        </div>
                                    )) : (
                                        <div className="w-full text-center py-20 text-muted-foreground border border-dashed border-primary/20 rounded-xl">
                                            Ningún proyecto coincide con esta etiqueta.
                                        </div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 -left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        </section>
    );
};

export default ProjectsSection;