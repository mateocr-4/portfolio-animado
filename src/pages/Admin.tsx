import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { 
  LogOut, LayoutDashboard, Users, Plus, 
  Trash2, Edit, Image as ImageIcon, FileUp, Check, X, Download, TrendingUp, Activity, BriefcaseBusiness
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Interfaces ---
export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  download_url: string;
  hardskills: string[];
  created_at?: string;
}

export interface Lead {
  id: string;
  nombre: string;
  email: string;
  linkedin_url: string;
  created_at: string;
  proyecto_interesado?: string;
  project_title?: string;
}

// --- Constants & Config ---
const SKILLS_CATEGORIES = {
  Frontend: ['React', 'Vue', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Framer Motion'],
  Backend: ['Node.js', 'Express', 'Python', 'Supabase', 'PostgreSQL', 'Firebase'],
  Tools: ['Git', 'Docker', 'AWS', 'Figma', 'Jest']
};

export const Admin: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'leads'>('overview');
  
  // Projects State
  const [projects, setProjects] = useState<Project[]>([]);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [loadingProjects, setLoadingProjects] = useState(true);
  
  // Leads State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(true);

  // Toast System State
  const [toast, setToast] = useState<{msg: string, type: 'success' | 'error'} | null>(null);

  // Check initial session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setIsAdmin(true);
    });
  }, []);

  // Fetch Data when Admin
  useEffect(() => {
    if (isAdmin) {
      fetchProjects();
      fetchLeads();
    }
  }, [isAdmin]);

  const fetchProjects = async () => {
    setLoadingProjects(true);
    const { data, error } = await supabase.from('projects').select('*');
    if (error) {
      showToast('Hubo un error cargando proyectos: ' + error.message, 'error');
      setLoadingProjects(false);
      return;
    }
    if (data) {
      const sortedData = [...data].sort((a, b) => {
        if (a.created_at && b.created_at) return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        return 0;
      });
      setProjects(sortedData);
    }
    setLoadingProjects(false);
  };

  const fetchLeads = async () => {
    setLoadingLeads(true);
    const { data: leadsData, error } = await supabase.from('leads').select('*');
    if (error) {
      showToast('Hubo un error cargando leads: ' + error.message, 'error');
      setLoadingLeads(false);
      return;
    }
    
    if (leadsData) {
      const formattedLeads = leadsData.map((l: any) => ({
        ...l,
        project_title: l.proyecto_interesado ? `Proyecto ID: ${l.proyecto_interesado}` : 'Desconocido'
      }));
      setLeads(formattedLeads.sort((a, b) => {
        if (a.created_at && b.created_at) return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        return 0;
      }));
    }
    setLoadingLeads(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setErrorMsg(error.message);
    } else {
      setIsAdmin(true);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  const deleteProject = async (id: string, title: string) => {
    if (!window.confirm(`¿Seguro que quieres eliminar definitivamente "${title}"?`)) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if(error) {
      showToast('Error borrando proyecto.', 'error');
    } else {
      showToast('Proyecto eliminado.', 'success');
      fetchProjects();
    }
  };

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
  };

  const exportLeadsCSV = () => {
    if (!leads.length) {
      showToast('No hay datos para exportar', 'error');
      return;
    }
    
    const headers = ['ID', 'Nombre', 'Email', 'LinkedIn', 'Proyecto ID (Lead)', 'Fecha'];
    const rows = leads.map(l => [
      l.id, `"${l.nombre}"`, `"${l.email}"`, `"${l.linkedin_url || ''}"`, `"${l.proyecto_interesado || 'N/A'}"`, `"${new Date(l.created_at).toLocaleString()}"`
    ].join(','));
    
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `leads_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Archivo CSV descargado con éxito', 'success');
  };

  const openEditor = (project: Project) => {
    setEditingProject(project);
    setIsCreatingProject(true);
  };

  // Render Login
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#050B14] flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="relative bg-[#0A1220] border border-emerald-500/20 p-8 rounded-2xl w-full max-w-sm shadow-[0_0_50px_rgba(16,185,129,0.05)] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 to-teal-400"></div>
          <h1 className="text-3xl font-extrabold text-white mb-8 text-center tracking-tight">Admin System</h1>
          <input 
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="Work Email" required
            className="w-full bg-[#050B14] border border-gray-800 p-3.5 text-white rounded-xl mb-4 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <input 
            type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Master Password" required
            className="w-full bg-[#050B14] border border-gray-800 p-3.5 text-white rounded-xl mb-6 focus:outline-none focus:border-emerald-500 transition-colors"
          />
           <button 
            type="submit" disabled={loading}
            className="w-full bg-emerald-600 text-white p-3.5 rounded-xl font-bold hover:bg-emerald-500 transition-colors disabled:opacity-50 tracking-wide"
          >
            {loading ? 'Authenticating...' : 'Secure Login'}
          </button>
          {errorMsg && <p className="text-red-400 mt-4 text-center text-sm bg-red-900/20 p-2 rounded">{errorMsg}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#050B14] font-sans text-gray-200 overflow-hidden selection:bg-emerald-500/30">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <ToastNotification 
            msg={toast.msg} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <aside className="w-72 bg-[#0A1220] border-r border-gray-800/60 hidden md:flex flex-col relative z-20 shadow-2xl">
        <div className="p-8">
          <h2 className="text-xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-1">
            MCD ADMIN
          </h2>
          <p className="text-xs text-gray-500 font-medium">Headless Studio CMS</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-3 mt-4">
          <button 
            onClick={() => { setActiveTab('overview'); setIsCreatingProject(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all ${activeTab === 'overview' && !isCreatingProject ? 'bg-emerald-900/20 text-emerald-400 border border-emerald-800/30 shadow-[0_4px_20px_rgba(16,185,129,0.05)]' : 'hover:bg-gray-800/40 text-gray-400 hover:text-gray-200 border border-transparent'}`}
          >
            <TrendingUp size={20} className={activeTab === 'overview' && !isCreatingProject ? 'text-emerald-400' : ''} />
            Overview
          </button>
          <button 
            onClick={() => { setActiveTab('projects'); setIsCreatingProject(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all ${activeTab === 'projects' && !isCreatingProject ? 'bg-emerald-900/20 text-emerald-400 border border-emerald-800/30 shadow-[0_4px_20px_rgba(16,185,129,0.05)]' : 'hover:bg-gray-800/40 text-gray-400 hover:text-gray-200 border border-transparent'}`}
          >
            <BriefcaseBusiness size={20} />
            Proyectos
          </button>
          <button 
            onClick={() => { setActiveTab('leads'); setIsCreatingProject(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all ${activeTab === 'leads' ? 'bg-emerald-900/20 text-emerald-400 border border-emerald-800/30 shadow-[0_4px_20px_rgba(16,185,129,0.05)]' : 'hover:bg-gray-800/40 text-gray-400 hover:text-gray-200 border border-transparent'}`}
          >
            <Users size={20} />
            Audiencia & Leads
          </button>
        </nav>

        <div className="p-6 border-t border-gray-800/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 p-[2px]">
              <div className="w-full h-full bg-[#0A1220] rounded-full flex items-center justify-center font-bold text-xs">MCD</div>
            </div>
            <div className="text-sm">
              <p className="font-bold text-white">Mateo Cañibano</p>
              <p className="text-xs text-emerald-500">Super Admin</p>
            </div>
          </div>
          <button onClick={handleLogout} className="p-2 text-gray-500 hover:text-red-400 transition-colors rounded-lg hover:bg-gray-800">
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative z-10 scroll-smooth">
        <div className="p-8 lg:p-12 max-w-7xl mx-auto min-h-full">
          
          <AnimatePresence mode="wait">
            
            {/* View: Overview Subpage */}
            {activeTab === 'overview' && !isCreatingProject && (
              <motion.div key="overview-dash" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <h1 className="text-4xl font-extrabold text-white mb-10 tracking-tight">System Overview</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* ... Total Proyectos */}
                  <div className="bg-[#0A1220] border border-gray-800 p-8 rounded-3xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all"></div>
                    <BriefcaseBusiness className="text-emerald-500 mb-6" size={32} />
                    <p className="text-gray-400 font-medium mb-1">Total Proyectos</p>
                    {loadingProjects ? (
                      <div className="h-12 w-16 bg-gray-800 rounded animate-pulse mt-2"></div>
                    ) : (
                      <p className="text-5xl font-black text-white">{projects.length}</p>
                    )}
                  </div>
                  
                  {/* ... Total Leads */}
                  <div className="bg-[#0A1220] border border-gray-800 p-8 rounded-3xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl group-hover:bg-teal-500/20 transition-all"></div>
                    <Users className="text-teal-500 mb-6" size={32} />
                    <p className="text-gray-400 font-medium mb-1">Leads Capturados</p>
                    {loadingLeads ? (
                      <div className="h-12 w-16 bg-gray-800 rounded animate-pulse mt-2"></div>
                    ) : (
                      <p className="text-5xl font-black text-white">{leads.length}</p>
                    )}
                  </div>

                  {/* ... Actividad Conversión */}
                  <div className="bg-[#0A1220] border border-gray-800 p-8 rounded-3xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
                    <Activity className="text-blue-500 mb-6" size={32} />
                    <p className="text-gray-400 font-medium mb-1">Última Conversión</p>
                    {loadingLeads ? (
                      <div className="h-8 w-24 bg-gray-800 rounded animate-pulse mt-4"></div>
                    ) : (
                      <>
                        <p className="text-xl font-bold text-white mt-4 line-clamp-2">
                           {leads.length > 0 ? new Date(leads[0].created_at).toLocaleDateString(undefined, {dateStyle: 'long'}) : 'Sin Actividad'}
                        </p>
                        {(() => {
                           const aWeekAgo = new Date();
                           aWeekAgo.setDate(aWeekAgo.getDate() - 7);
                           const recentLeads = leads.filter(l => new Date(l.created_at) >= aWeekAgo).length;
                           if (recentLeads > 0) return <span className="inline-block mt-2 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">+{recentLeads} esta semana</span>;
                           return null;
                        })()}
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* View: Projects List */}
            {activeTab === 'projects' && !isCreatingProject && (
              <motion.div key="projects-list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="mb-10 flex flex-col md:flex-row justify-between md:items-end gap-6">
                  <div>
                    <h1 className="text-4xl font-extrabold text-white mb-2">Portfolio CMS</h1>
                    <p className="text-gray-400">Gestiona y actualiza los casos de estudio publicados.</p>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => {
                        setEditingProject(null);
                        setIsCreatingProject(true);
                      }}
                      className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105"
                    >
                      <Plus size={20} strokeWidth={3} />
                      Crear Proyecto
                    </button>
                  </div>
                </div>

                <div className="bg-[#0A1220] border border-gray-800/80 rounded-3xl overflow-hidden shadow-2xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#0f172a] border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider font-semibold">
                        <th className="p-5 pl-8">Min / Proyecto</th>
                        <th className="p-5">Tech Stack</th>
                        <th className="p-5">Fecha Publicación</th>
                        <th className="p-5 text-right pr-8">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/50">
                      {loadingProjects ? (
                        Array(3).fill(0).map((_, i) => (
                           <tr key={`sk-${i}`}>
                             <td className="p-5 pl-8 text-center text-gray-500 font-medium"><div className="h-10 w-full max-w-[200px] bg-gray-800 rounded animate-pulse"></div></td>
                             <td className="p-5"><div className="h-6 w-24 bg-gray-800 rounded-full animate-pulse"></div></td>
                             <td className="p-5"><div className="h-4 w-20 bg-gray-800 rounded animate-pulse"></div></td>
                             <td className="p-5"></td>
                           </tr>
                        ))
                      ) : (
                        projects.map(p => (
                          <tr key={p.id} className="hover:bg-gray-800/20 transition-colors group">
                            <td className="p-5 pl-8">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gray-900 border border-gray-800 overflow-hidden shrink-0 flex items-center justify-center">
                                  {p.image_url ? (
                                     <img src={p.image_url} alt={p.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" crossOrigin="anonymous"/>
                                  ) : (
                                     <ImageIcon size={20} className="text-gray-600" />
                                  )}
                                </div>
                                <div>
                                  <div className="font-bold text-white text-base mb-0.5">{p.title}</div>
                                  <div className="text-xs text-gray-500 truncate max-w-[250px]">{p.description}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-5">
                              <div className="flex flex-wrap gap-1.5">
                                {p.hardskills?.slice(0, 3).map(s => (
                                  <span key={s} className="bg-emerald-950/40 border border-emerald-900/50 text-xs px-2.5 py-1 rounded-full text-emerald-400">{s}</span>
                                ))}
                                {p.hardskills?.length > 3 && <span className="bg-gray-800 border border-gray-700 text-xs px-2.5 py-1 rounded-full text-gray-400">+{p.hardskills.length - 3}</span>}
                              </div>
                            </td>
                            <td className="p-5 text-sm text-gray-400 font-medium">
                              {p.created_at ? new Date(p.created_at).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="p-5 text-right pr-8">
                              <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => openEditor(p)} className="p-2 text-gray-400 hover:text-emerald-400 transition-colors rounded-lg bg-gray-900 hover:bg-emerald-900/30">
                                  <Edit size={16} />
                                </button>
                                <button onClick={() => deleteProject(p.id, p.title)} className="p-2 text-gray-400 hover:text-red-400 transition-colors rounded-lg bg-gray-900 hover:bg-red-900/30">
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                      
                      {!loadingProjects && projects.length === 0 && (
                        <tr><td colSpan={4} className="p-16 text-center text-gray-500 font-medium">No hay proyectos indexados.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* View: Create / Edit Project */}
            {(activeTab === 'projects' || activeTab === 'overview') && isCreatingProject && (
              <motion.div key="project-form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                <ProjectCreationForm 
                  initialData={editingProject}
                  onCancel={() => { setIsCreatingProject(false); setEditingProject(null); }} 
                  onSuccess={() => { setIsCreatingProject(false); setEditingProject(null); fetchProjects(); }} 
                  showToast={showToast}
                />
              </motion.div>
            )}

            {/* View: Leads */}
            {activeTab === 'leads' && (
              <motion.div key="leads-list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="flex flex-col md:flex-row justify-between md:items-end mb-10 gap-6">
                   <div>
                     <h1 className="text-4xl font-extrabold text-white mb-2">Base de Leads</h1>
                     <p className="text-gray-400">Prospectos adquiridos a través del embudo de cada proyecto.</p>
                   </div>
                   <button 
                      onClick={exportLeadsCSV}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:scale-105"
                    >
                      <Download size={18} strokeWidth={2.5} />
                      Exportar a CSV
                    </button>
                </div>
                
                <div className="bg-[#0A1220] border border-gray-800/80 rounded-3xl overflow-hidden shadow-2xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#0f172a] border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider font-semibold">
                        <th className="p-5 pl-8">Contacto Generado</th>
                        <th className="p-5">Interés Principal</th>
                        <th className="p-5">Fecha Captación</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/50">
                      {loadingLeads ? (
                         Array(2).fill(0).map((_, i) => (
                           <tr key={`skL-${i}`}>
                             <td className="p-5 pl-8 text-center text-gray-500 font-medium"><div className="h-8 w-full max-w-[150px] bg-gray-800 rounded animate-pulse"></div></td>
                             <td className="p-5"><div className="h-6 w-32 bg-gray-800 rounded-lg animate-pulse"></div></td>
                             <td className="p-5"><div className="h-4 w-20 bg-gray-800 rounded animate-pulse"></div></td>
                           </tr>
                         ))
                      ) : (
                        leads.map(l => (
                          <tr key={l.id} className="hover:bg-gray-800/20 transition-colors group">
                            <td className="p-5 pl-8">
                              <div className="font-bold text-white text-base">{l.nombre}</div>
                              <div className="text-sm text-emerald-400/90 tracking-wide">{l.email}</div>
                              {l.linkedin_url && (
                                <div className="text-xs text-gray-500 mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-900/10 border border-blue-900/20">
                                  <span className="text-blue-400">IN</span>
                                  <a href={l.linkedin_url} target="_blank" rel="noreferrer" className="hover:text-blue-300 truncate inline-block max-w-[180px]">{l.linkedin_url}</a>
                                </div>
                              )}
                            </td>
                            <td className="p-5">
                              <span className="inline-block px-3 py-1.5 bg-gray-900 border border-gray-700 rounded-lg text-sm text-gray-300 font-medium">
                                {l.project_title || 'Desconocido'}
                              </span>
                            </td>
                            <td className="p-5 text-gray-400 font-medium">
                              {l.created_at ? new Date(l.created_at).toLocaleString() : 'Sin fecha'}
                            </td>
                          </tr>
                        ))
                      )}
                      
                      {!loadingLeads && leads.length === 0 && (
                        <tr><td colSpan={3} className="p-16 text-center text-gray-500 font-medium">No hay registros almacenados.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>
    </div>
  );
};

// --- Subcomponent: TOAST ---
const ToastNotification = ({ msg, type, onClose }: { msg: string, type: 'success' | 'error', onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, scale: 0.95 }} 
      animate={{ opacity: 1, y: 0, scale: 1 }} 
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`fixed bottom-8 right-8 z-[100] px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border ${
        type === 'error' ? 'bg-[#2A0808] border-red-900/50 text-red-100' : 'bg-[#062417] border-emerald-900/50 text-emerald-100'
      } backdrop-blur-xl`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${type === 'error' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
        {type === 'error' ? <X size={16} strokeWidth={3}/> : <Check size={16} strokeWidth={3}/>}
      </div>
      <span className="font-semibold text-sm mr-2">{msg}</span>
      <button onClick={onClose} className="opacity-50 hover:opacity-100 transition-opacity ml-auto"><X size={14} /></button>
    </motion.div>
  );
};

// --- Subcomponent: Project Creation/Update Form ---
interface ProjectCreationFormProps {
  initialData: Project | null;
  onCancel: () => void;
  onSuccess: () => void;
  showToast: (msg: string, type: 'success' | 'error') => void;
}

const ProjectCreationForm: React.FC<ProjectCreationFormProps> = ({ initialData, onCancel, onSuccess, showToast }) => {
  const isEditing = !!initialData;
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(initialData?.hardskills || []);
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [projectFile, setProjectFile] = useState<File | null>(null);
  
  const [loading, setLoading] = useState(false);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const generateFileName = (file: File) => {
    const ext = file.name.split('.').pop();
    const hash = Math.random().toString(36).substring(2, 8);
    return `${Date.now()}-${hash}.${ext}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing && (!imageFile || !projectFile)) {
      showToast('Añade imagen portada y el ZIP de materiales.', 'error');
      return;
    }

    setLoading(true);
    
    try {
      let finalImageUrl = initialData?.image_url;
      let finalDownloadUrl = initialData?.download_url;

      // Upload new Image if provided
      if (imageFile) {
        const imagePath = `images/${generateFileName(imageFile)}`;
        const { error: imgErr } = await supabase.storage.from('project-files').upload(imagePath, imageFile);
        if (imgErr) throw new Error("Error imagen: " + imgErr.message);
        const { data: imgDataUrl } = supabase.storage.from('project-files').getPublicUrl(imagePath);
        finalImageUrl = imgDataUrl.publicUrl;
      }

      // Upload new Zip if provided
      if (projectFile) {
        const filePath = `downloads/${generateFileName(projectFile)}`;
        const { error: fileErr } = await supabase.storage.from('project-files').upload(filePath, projectFile);
        if (fileErr) throw new Error("Error archivo: " + fileErr.message);
        // Save the raw path for precise downloading later, or publicUrl
        finalDownloadUrl = filePath; 
      }

      const payload = {
        title,
        description,
        image_url: finalImageUrl,
        download_url: finalDownloadUrl,
        hardskills: selectedSkills
      };

      if (isEditing) {
        const { error } = await supabase.from('projects').update(payload).eq('id', initialData.id);
        if (error) throw new Error("Error actualizando DB");
        showToast('Proyecto modificado correctamente', 'success');
      } else {
        const { error } = await supabase.from('projects').insert([payload]);
        if (error) throw new Error("Error guardando proyecto nuevo");
        showToast('Proyecto publicado en vivo', 'success');
      }

      onSuccess();

    } catch (err: any) {
      console.error(err);
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#0A1220] border border-gray-800 p-10 rounded-3xl space-y-10 shadow-2xl relative overflow-hidden">
      
      {/* Premium Header */}
      <div className="relative z-10 flex justify-between items-center border-b border-gray-800/80 pb-6">
        <div>
           <h2 className="text-3xl font-extrabold text-white">{isEditing ? 'Editar Proyecto' : 'Crear Proyecto'}</h2>
           <p className="text-gray-500 mt-1">{isEditing ? `Actualizando "${initialData.title}"` : 'Completa todos los campos para publicar un caso de estudio nuevo.'}</p>
        </div>
        <button type="button" onClick={onCancel} className="text-gray-500 hover:text-white transition-colors bg-gray-900 hover:bg-gray-800 p-2 rounded-xl border border-gray-800">
           <X size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
        
        {/* Left Column: Metadata */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-3 ml-2 tracking-wide uppercase">Título Principal</label>
            <input required type="text" value={title} onChange={e => setTitle(e.target.value)} 
              className="w-full bg-[#050B14] border border-gray-800 p-4 text-white rounded-2xl focus:outline-none focus:border-emerald-500 transition-colors shadow-inner text-lg font-medium" 
              placeholder="Ej: Dashboard Corporate Analytics" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-3 ml-2 tracking-wide uppercase">Pitch / Descripción</label>
            <textarea required value={description} onChange={e => setDescription(e.target.value)} 
              className="w-full bg-[#050B14] border border-gray-800 p-4 text-white rounded-2xl focus:outline-none focus:border-emerald-500 transition-colors min-h-[160px] shadow-inner text-lg leading-relaxed" 
              placeholder="¿Qué problema resuelve este proyecto? Describe los retos técnicos superados..." />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-4 ml-2 tracking-wide uppercase">Tecnologías (Skills)</label>
            <div className="space-y-6 bg-[#050B14] p-6 rounded-2xl border border-gray-800 shadow-inner max-h-72 overflow-y-auto">
              {Object.entries(SKILLS_CATEGORIES).map(([category, skills]) => (
                <div key={category}>
                  <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-3">{category}</p>
                  <div className="flex flex-wrap gap-2.5">
                    {skills.map(skill => {
                      const isSelected = selectedSkills.includes(skill);
                      return (
                        <button
                          key={skill} type="button"
                          onClick={() => toggleSkill(skill)}
                          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all border ${
                            isSelected ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-[#0A1220] text-gray-400 border-gray-800 hover:border-gray-600'
                          }`}
                        >
                          {isSelected && <Check size={16} strokeWidth={3}/>}
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Files Upload Dropzones */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#050B14] border-2 border-dashed border-gray-800 p-8 rounded-3xl hover:border-emerald-500/50 transition-colors group relative overflow-hidden flex flex-col items-center justify-center text-center min-h-[200px]">
            {isEditing && !imageFile && initialData?.image_url && (
              <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-10 transition-opacity">
                <img src={initialData.image_url} alt="Cover" className="w-full h-full object-cover" crossOrigin="anonymous"/>
              </div>
            )}
            <div className="relative z-10 pointer-events-none">
               <ImageIcon size={40} className="text-emerald-500/80 mx-auto mb-4 group-hover:scale-110 transition-transform" />
               <p className="text-gray-300 font-bold mb-1">Imagen de Portada</p>
               <p className="text-sm text-gray-500">{imageFile ? imageFile.name : (isEditing ? 'Sube una nueva para reemplazar' : 'Formatos web (JPG, PNG. max 2MB)')}</p>
            </div>
            <input 
              type="file" accept="image/*" required={!isEditing}
              onChange={e => setImageFile(e.target.files ? e.target.files[0] : null)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
            />
            {imageFile && <div className="absolute bottom-4 right-4 bg-emerald-600 rounded-full p-1.5"><Check size={14} className="text-white"/></div>}
          </div>

          <div className="bg-[#050B14] border-2 border-dashed border-gray-800 p-8 rounded-3xl hover:border-blue-500/50 transition-colors group relative overflow-hidden flex flex-col items-center justify-center text-center min-h-[200px]">
            <div className="relative z-10 pointer-events-none">
               <FileUp size={40} className="text-blue-500/80 mx-auto mb-4 group-hover:scale-110 transition-transform" />
               <p className="text-gray-300 font-bold mb-1">Material Descargable</p>
               <p className="text-sm text-gray-500">{projectFile ? projectFile.name : (isEditing ? 'Sube un nuevo .zip para reemplazar' : 'Zip con dependencias / código fuente')}</p>
            </div>
            <input 
              type="file" accept=".zip,.pdf,.rar" required={!isEditing}
              onChange={e => setProjectFile(e.target.files ? e.target.files[0] : null)} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
            />
            {projectFile && <div className="absolute bottom-4 right-4 bg-emerald-600 rounded-full p-1.5"><Check size={14} className="text-white"/></div>}
          </div>
        </div>
      </div>

      {/* Footer Submit */}
      <div className="pt-8 border-t border-gray-800/80 flex justify-end relative z-10">
        <button 
          disabled={loading} type="submit" 
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-4 rounded-full font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_10px_40px_rgba(16,185,129,0.5)] transform hover:-translate-y-1"
        >
          {loading ? 'Sincronizando Cloud...' : (isEditing ? 'Guardar Cambios' : 'Publicar Proyecto')}
        </button>
      </div>
      
      {/* Background ambient glow */}
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-emerald-500/5 rounded-full blur-[100px] z-0"></div>
    </form>
  );
};
