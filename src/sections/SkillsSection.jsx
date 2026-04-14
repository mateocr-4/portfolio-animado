import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { data } from '../lib/data';
import { GlassIcon } from '../components/GlassIcon';

const areas = Object.keys(data.competencies);

// Collect all unique tools across all competencies for the synced stack
const allTools = new Set();
Object.values(data.competencies).forEach(roles => {
    roles.forEach(role => role.tools.forEach(t => allTools.add(t)));
});
const syncedStack = [...allTools];

const SkillsSection = () => {
    const [activeArea, setActiveArea] = useState(areas[0]);
    const [activeRole, setActiveRole] = useState(null);

    const roles = data.competencies[activeArea] || [];

    const handleAreaChange = (area) => {
        setActiveArea(area);
        setActiveRole(null);
    };

    const handleRoleClick = (role) => {
        setActiveRole(activeRole?.role === role.role ? null : role);
    };

    return (
        <section
            id="skills"
            className="py-24 md:py-32 relative overflow-hidden"
            aria-label="Competencias profesionales híbridas"
        >
            <div className="max-w-6xl mx-auto px-6">

                <motion.h2
                    className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-shimmer"
                    initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    Competencias Profesionales
                </motion.h2>

                <motion.p
                    className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Perfil híbrido en Marketing Digital y Desarrollo de Aplicaciones Web
                </motion.p>

                {/* ───── NIVEL 1: Toggle ───── */}
                <motion.div
                    className="flex justify-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div className="inline-flex rounded-xl glass-deep p-1.5">
                        {areas.map((area) => (
                            <button
                                key={area}
                                onClick={() => handleAreaChange(area)}
                                className={`relative px-6 py-3 text-sm font-bold rounded-lg transition-all duration-300 cursor-pointer
                                    ${activeArea === area
                                        ? 'bg-gradient-to-r from-primary to-emerald-400 text-primary-foreground shadow-lg shadow-primary/20'
                                        : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {area}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* ───── NIVEL 2: Role Cards with Glass Icons ───── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeArea}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {roles.map((roleItem, index) => {
                            const isActive = activeRole?.role === roleItem.role;

                            return (
                                <motion.div
                                    key={roleItem.role}
                                    onClick={() => handleRoleClick(roleItem)}
                                    initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                    className={`relative p-5 rounded-xl cursor-pointer transition-all duration-300 group
                                        ${isActive
                                            ? 'glass-deep border-primary/30 shadow-[0_0_25px_rgba(16,185,129,0.08)]'
                                            : 'glass border-transparent hover:border-primary/15 hover:shadow-[0_0_20px_rgba(16,185,129,0.04)]'
                                        }`}
                                    whileHover={{ y: -3 }}
                                >
                                    <div className="flex items-center gap-4 mb-3">
                                        {/* Glass 3D icon */}
                                        <GlassIcon name={roleItem.icon} size={42} />
                                        <div>
                                            <h3 className={`text-lg font-bold transition-colors duration-300
                                                ${isActive ? 'text-primary' : 'text-foreground group-hover:text-primary'}`
                                            }>
                                                {roleItem.role}
                                            </h3>
                                            <p className="text-xs text-muted-foreground font-mono">
                                                {roleItem.tools.length} herramientas
                                            </p>
                                        </div>
                                    </div>

                                    {/* Expand indicator */}
                                    <div className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                                        ${isActive
                                            ? 'bg-primary text-primary-foreground rotate-45 shadow-[0_0_10px_rgba(16,185,129,0.25)]'
                                            : 'bg-white/5 text-muted-foreground group-hover:bg-primary/10'
                                        }`}
                                    >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>

                                    {/* ───── NIVEL 3: Tools ───── */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                className="overflow-hidden"
                                            >
                                                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-primary/10">
                                                    {roleItem.tools.map((tool, i) => (
                                                        <motion.span
                                                            key={tool}
                                                            initial={{ opacity: 0, scale: 0.8, y: 5 }}
                                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                                            transition={{ duration: 0.25, delay: i * 0.05 }}
                                                            className="text-xs font-mono px-3 py-1.5 rounded-lg cursor-default
                                                                       bg-primary/8 text-primary border border-primary/15
                                                                       hover:bg-primary hover:text-primary-foreground
                                                                       hover:shadow-[0_0_12px_rgba(16,185,129,0.15)]
                                                                       transition-all duration-200"
                                                        >
                                                            {tool}
                                                        </motion.span>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

                {/* ───── Synced Stack (reflejo técnico de competencias) ───── */}
                <motion.div
                    className="p-6 rounded-xl glass-deep"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <p className="text-xs font-mono text-primary/60 uppercase tracking-widest mb-4">
                        Stack Técnico Completo — sincronizado con competencias
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {syncedStack.map((tool, i) => (
                            <motion.span
                                key={tool}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.03 }}
                                className="text-xs font-mono px-3 py-1.5 rounded-lg cursor-default
                                           bg-white/3 text-muted-foreground border border-white/5
                                           hover:bg-primary/10 hover:text-primary hover:border-primary/20
                                           transition-all duration-300"
                            >
                                {tool}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                <motion.p
                    className="text-center text-xs text-muted-foreground/40 font-mono mt-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                >
                    Selecciona un rol para ver su stack específico
                </motion.p>

            </div>
        </section>
    );
};

export default SkillsSection;