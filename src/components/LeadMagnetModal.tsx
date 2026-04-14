import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { Project } from './ProjectGrid';

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export const LeadMagnetModal: React.FC<LeadMagnetModalProps> = ({ isOpen, onClose, project }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !project) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim()) {
      setError('Nombre y email son obligatorios');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      // 1. Insert lead into Supabase
      const { error: insertError } = await supabase.from('leads').insert([
        {
          nombre,
          email,
          linkedin_url: linkedin || null,
          proyecto_interesado: project.id
        }
      ]);

      if (insertError) throw insertError;

      // 2. Trigger Download securely AFTER insert
      const { data } = await supabase.storage
        .from('project-files')
        .getPublicUrl(project.download_url); // The download_url should be the storage file path e.g. "projects/my-zip.zip"
      
      // If it's an external link, we use download_url directly. Let's handle both.
      const urlToDownload = project.download_url.startsWith('http') 
        ? project.download_url 
        : data.publicUrl;

      // Fallback way to force download
      const link = document.createElement('a');
      link.href = urlToDownload;
      link.setAttribute('download', '');
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Close modal and reset
      setNombre('');
      setEmail('');
      setLinkedin('');
      onClose();
      
    } catch (err: any) {
      console.error(err);
      setError('Hubo un error al procesar tu solicitud. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="bg-gray-900 border border-gray-800 p-8 rounded-xl w-full max-w-md shadow-2xl relative"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            ✕
          </button>
          
          <h2 className="text-2xl font-bold text-white mb-2">Descargar {project.title}</h2>
          <p className="text-gray-400 mb-6 text-sm">
            Déjame tus datos para acceder al código y recursos exclusivos de este proyecto.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Nombre *</label>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full bg-black border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Tu nombre"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">LinkedIn (Opcional)</label>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full bg-black border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="https://linkedin.com/in/tu-perfil"
              />
            </div>

            {error && <div className="text-red-400 text-sm">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-md text-white font-bold transition-all mt-4 ${
                loading ? 'bg-blue-800 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'
              }`}
            >
              {loading ? 'Procesando...' : 'Descargar Archivos'}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
