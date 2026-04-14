import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';

export interface Project {
  id: string;
  nombre: string;
  descripcion: string;
  hardskills: string[];
  imagen_url: string;
  download_url: string;
}

interface ProjectGridProps {
  onDownloadClick: (project: Project) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ onDownloadClick }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Extract unique skills from all projects
  const allSkills = Array.from(
    new Set(projects.flatMap(p => p.hardskills || []))
  ).sort();

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('fecha', { ascending: false });
      
      if (!error && data) {
        setProjects(data as Project[]);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const filteredProjects = selectedSkill
    ? projects.filter(p => p.hardskills?.includes(selectedSkill))
    : projects;

  if (loading) {
    return <div className="text-center py-10">Cargando proyectos...</div>;
  }

  return (
    <div className="w-full">
      {/* Skill Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedSkill(null)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selectedSkill === null 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          All
        </button>
        {allSkills.map(skill => (
          <button
            key={skill}
            onClick={() => setSelectedSkill(skill)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedSkill === skill 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {skill}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div 
        layout 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredProjects.map(project => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={project.id}
              className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition-all flex flex-col h-full"
            >
              {project.imagen_url && (
                <div className="h-48 w-full overflow-hidden bg-gray-800">
                  <img 
                    src={project.imagen_url} 
                    alt={project.nombre} 
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
              )}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2">{project.nombre}</h3>
                <p className="text-gray-400 text-sm flex-grow mb-4">{project.descripcion}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.hardskills?.map(skill => (
                    <span key={skill} className="text-xs bg-gray-800 text-blue-300 px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>

                {project.download_url && (
                  <button
                    onClick={() => onDownloadClick(project)}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors"
                  >
                    Descargar Proyecto
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
