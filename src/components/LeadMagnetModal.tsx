import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { Project } from './ProjectGrid';

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

// --- Security Helpers ---
const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const MAX_TEXT_LENGTH = 200;

/** Rejects any URL that is not http/https to block javascript:, data:, etc. */
function sanitizeUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

function sanitizeText(text: string): string {
  return text.trim().slice(0, MAX_TEXT_LENGTH);
}

export const LeadMagnetModal: React.FC<LeadMagnetModalProps> = ({ isOpen, onClose, project }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [honeypot, setHoneypot] = useState(''); // anti-bot field, must stay empty
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !project) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // [SECURITY] Honeypot: bots fill hidden fields, humans don't
    if (honeypot) return;

    const cleanNombre = sanitizeText(nombre);
    const cleanEmail = sanitizeText(email).toLowerCase();
    const cleanLinkedin = linkedin.trim() ? sanitizeUrl(linkedin.trim()) : null;

    // [SECURITY] Server-side style email validation (type=email is client-only, easily bypassed)
    if (!cleanNombre || !cleanEmail) {
      setError('Nombre y email son obligatorios');
      return;
    }
    if (!EMAIL_REGEX.test(cleanEmail)) {
      setError('El email no tiene un formato válido.');
      return;
    }
    if (linkedin.trim() && cleanLinkedin === null) {
      setError('La URL de LinkedIn no es válida. Acepta solo URLs https://.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 1. Insert sanitized lead into Supabase
      const { error: insertError } = await supabase.from('leads').insert([
        {
          nombre: cleanNombre,
          email: cleanEmail,
          linkedin_url: cleanLinkedin,
          proyecto_interesado: project!.id
        }
      ]);

      if (insertError) throw insertError;

      // 2. Resolve download URL securely
      let urlToDownload: string;
      const rawUrl = project!.download_url;

      if (rawUrl.startsWith('http')) {
        // [SECURITY] Validate protocol before using any external URL as download target
        const safe = sanitizeUrl(rawUrl);
        if (!safe) throw new Error('URL de descarga inválida.');
        urlToDownload = safe;
      } else {
        // Storage path - get a signed or public URL from Supabase
        const { data } = await supabase.storage
          .from('project-files')
          .getPublicUrl(rawUrl);
        urlToDownload = data.publicUrl;
      }

      // Trigger download
      const link = document.createElement('a');
      link.href = urlToDownload;
      link.setAttribute('download', '');
      link.rel = 'noopener noreferrer';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Reset and close
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
            {/* [SECURITY] Honeypot: hidden from human users, bot fills it → submission rejected */}
            <div style={{ display: 'none' }} aria-hidden="true">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Nombre *</label>
              <input
                type="text"
                required
                maxLength={MAX_TEXT_LENGTH}
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
                maxLength={MAX_TEXT_LENGTH}
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

            {error && <div className="text-red-400 text-sm" role="alert">{error}</div>}

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
