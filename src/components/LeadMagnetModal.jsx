import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Loader2, CheckCircle2 } from 'lucide-react';

export const LeadMagnetModal = ({ isOpen, onClose, leadMagnetData }) => {
    const [formData, setFormData] = useState({ name: '', email: '', linkedin: '' });
    const [status, setStatus] = useState('idle'); // idle | loading | success

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        
        // Simular envío a API (ej. Formspree/Netlify)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setStatus('success');
        
        // Simular descarga automática después de 1 segundo
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = '#';
            link.download = leadMagnetData?.fileName || 'recurso.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Cerrar el modal después de la descarga
            setTimeout(() => {
                onClose();
                setStatus('idle');
                setFormData({ name: '', email: '', linkedin: '' });
            }, 1500);
        }, 1000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={status !== 'loading' ? onClose : undefined}
                        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="bg-[#0f141a] border border-primary/20 shadow-2xl rounded-2xl w-full max-w-md overflow-hidden pointer-events-auto relative"
                        >
                            {/* Close Button */}
                            {status !== 'loading' && status !== 'success' && (
                                <button 
                                    onClick={onClose}
                                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}

                            {/* Header */}
                            <div className="bg-primary/5 p-6 border-b border-primary/10 text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -translate-y-1/2 translate-x-1/3 rounded-full" />
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {leadMagnetData?.title || 'Descargar Recurso'}
                                </h3>
                                <p className="text-sm text-muted-foreground relative z-10">
                                    Desbloquea este recurso exclusivo ingresando tus datos profesionales.
                                </p>
                            </div>

                            {/* Body */}
                            <div className="p-6">
                                {status === 'idle' && (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label htmlFor="name" className="block text-xs font-medium text-muted-foreground mb-1 ml-1">Nombre Completo</label>
                                            <input
                                                id="name"
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-background border border-primary/20 rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                                placeholder="Ej. Jane Doe"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-xs font-medium text-muted-foreground mb-1 ml-1">Email Profesional</label>
                                            <input
                                                id="email"
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-background border border-primary/20 rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                                placeholder="jane@empresa.com"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="linkedin" className="block text-xs font-medium text-muted-foreground mb-1 ml-1">Perfil de LinkedIn (Opcional)</label>
                                            <input
                                                id="linkedin"
                                                type="url"
                                                value={formData.linkedin}
                                                onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                                                className="w-full bg-background border border-primary/20 rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                                placeholder="https://linkedin.com/in/..."
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-4 rounded-lg mt-6 transition-colors"
                                        >
                                            <Download className="w-5 h-5" />
                                            {leadMagnetData?.ctaText || 'Descargar Ahora'}
                                        </button>
                                        <p className="text-center text-[10px] text-muted-foreground mt-3">
                                            Tu información está segura. Nunca enviamos spam.
                                        </p>
                                    </form>
                                )}

                                {status === 'loading' && (
                                    <div className="flex flex-col items-center justify-center py-10 space-y-4">
                                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                                        <p className="text-sm font-medium text-muted-foreground animate-pulse">Procesando solicitud...</p>
                                    </div>
                                )}

                                {status === 'success' && (
                                    <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", bounce: 0.5 }}
                                        >
                                            <CheckCircle2 className="w-16 h-16 text-primary" />
                                        </motion.div>
                                        <div>
                                            <h4 className="text-xl font-bold text-foreground mb-1">¡Todo Listo!</h4>
                                            <p className="text-sm text-muted-foreground">Tu descarga comenzará en breve.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};
