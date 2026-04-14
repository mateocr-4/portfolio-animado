import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Lock } from 'lucide-react';
import { LeadMagnetModal } from '../components/LeadMagnetModal';
import { supabase } from '../lib/supabaseClient';
import { SEO } from '../components/SEO';

const ProjectSubpage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
            if (data) {
                setProject(data);
            } else {
                console.error("No se encontró el proyecto", error);
                navigate('/', { replace: true });
            }
            setIsLoading(false);
        };
        
        fetchProject();
        window.scrollTo(0, 0);
    }, [id, navigate]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex justify-center items-center">
                 <div className="w-12 h-12 border-4 border-t-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }
    
    if (!project) return null;

    return (
        <main className="min-h-screen bg-background text-foreground pt-20">
            <SEO 
                title={project.title} 
                description={project.description} 
                imageUrl={project.image_url} 
            />

            {/* Nav / Back Button */}
            <div className="max-w-4xl mx-auto px-6 py-6 pt-10">
                <button 
                    onClick={() => navigate('/')}
                    className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-semibold"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Volver al Portfolio
                </button>
            </div>

            {/* Hero Section */}
            <section className="max-w-4xl mx-auto px-6 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 text-xs font-bold bg-primary/10 text-primary border border-primary/20 rounded-full">
                            Caso de Estudio o Proyecto
                        </span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-shimmer leading-tight text-white">
                        {project.title}
                    </h1>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.hardskills?.map(skill => (
                            <span key={skill} className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700">
                                {skill}
                            </span>
                        ))}
                    </div>

                    <p className="text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                        {project.description}
                    </p>
                </motion.div>
                
                {project.image_url && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-14 rounded-2xl overflow-hidden border border-primary/20 shadow-2xl relative"
                    >
                        <div className="aspect-[16/9] w-full bg-[#111823] flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                            <img 
                                src={project.image_url} 
                                alt={project.title} 
                                className="object-cover w-full h-full opacity-70 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 hover:opacity-100"
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                        </div>
                    </motion.div>
                )}
            </section>

            {/* Lead Magnet CTA */}
            {project.download_url && (
                <section className="py-24 relative overflow-hidden">
                    <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-primary/5 border border-primary/20 rounded-3xl p-10 md:p-16 relative overflow-hidden"
                        >
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-3xl rounded-full"></div>
                            
                            <Lock className="w-12 h-12 text-primary mx-auto mb-6" />
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Accede al Material Descargable
                            </h2>
                            <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-lg">
                                Este proyecto incluye material exclusivo en forma de archivo descargable o recurso. Para acceder, simplemente envíame tus datos a continuación.
                            </p>
                            
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="inline-flex items-center gap-2 py-4 px-10 text-lg font-bold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-105"
                            >
                                Descargar Archivo del Proyecto
                            </button>
                        </motion.div>
                    </div>
                </section>
            )}

            <LeadMagnetModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                project={project}
            />
        </main>
    );
};

export default ProjectSubpage;
