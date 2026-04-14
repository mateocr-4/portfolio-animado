import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';
import { data } from '../lib/data';

const AnalyticsSection = () => {

    const kpis = [
        { title: "Tráfico Orgánico", value: "37.5K", change: "+8.2K", gradient: "from-emerald-500/20 to-emerald-500/5" },
        { title: "Leads Orgánicos", value: "1,000", change: "+340", gradient: "from-violet-500/20 to-violet-500/5" },
        { title: "ROI de Campaña", value: "335%", change: "+15", gradient: "from-emerald-400/20 to-emerald-400/5" },
        { title: "Tasa de Conversión", value: "5.2%", change: "+0.9", gradient: "from-violet-400/20 to-violet-400/5" },
    ];

    const performanceBars = [
        { label: "SEO", pct: 92, color: "from-emerald-500 to-emerald-400", glow: "rgba(16,185,129,0.3)" },
        { label: "SEM", pct: 85, color: "from-violet-500 to-violet-400", glow: "rgba(124,58,237,0.3)" },
        { label: "Analytics", pct: 95, color: "from-emerald-400 to-emerald-300", glow: "rgba(52,211,153,0.3)" },
        { label: "CRO", pct: 78, color: "from-violet-400 to-violet-300", glow: "rgba(167,139,250,0.3)" },
    ];

    const toolset = data.skills
        .filter(skill =>
            skill.category === "Analítica de Datos" ||
            skill.category === "Medición y Tracking" ||
            skill.category === "Análisis Web"
        )
        .map(skill => skill.name);

    const MetricCard = ({ title, value, change, gradient, index }) => (
        <motion.div
            className={`relative p-5 rounded-xl border border-primary/10 shadow-md cursor-default group overflow-hidden
                         bg-gradient-to-br ${gradient} backdrop-blur-sm`}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, borderColor: 'rgba(16,185,129,0.25)' }}
        >
            <p className="text-sm text-muted-foreground mb-2 tracking-wider font-mono uppercase">{title}</p>
            <div className="flex items-end justify-between">
                <h3 className="text-3xl font-extrabold text-foreground group-hover:text-primary transition-colors duration-300">{value}</h3>
                <span className="text-sm font-semibold flex items-center text-emerald-400">
                    <FaArrowUp className="w-3 h-3 mr-1" />
                    {change}
                </span>
            </div>
        </motion.div>
    );

    return (
        <section id="analytics" className="py-24 md:py-32 relative overflow-hidden" aria-label="Métricas de rendimiento profesional">
            <div className="max-w-7xl mx-auto px-6">

                <motion.h2
                    className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-shimmer"
                    initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    Digital Analytics
                </motion.h2>
                <motion.p
                    className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Resultados reales de rendimiento en campañas y estrategia digital
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="p-8 rounded-2xl glass-deep"
                >
                    <h3 className="text-2xl font-extrabold text-foreground mb-6">
                        Monitoreo de Performance
                    </h3>

                    {/* KPI GRID */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {kpis.map((kpi, i) => (
                            <MetricCard key={kpi.title} {...kpi} index={i} />
                        ))}
                    </div>

                    {/* TOOLSET + BAR CHART */}
                    <div className="grid md:grid-cols-2 gap-8">

                        {/* Toolset */}
                        <div className="p-5 rounded-xl bg-secondary/10 border border-secondary/15">
                            <p className="text-primary font-bold mb-3 tracking-wider text-sm uppercase">Stack de Herramientas</p>
                            <div className="flex flex-wrap gap-2">
                                {toolset.map((tool, i) => (
                                    <motion.span
                                        key={tool}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.06 }}
                                        className="text-xs px-3 py-1.5 bg-primary/10 text-primary rounded-lg border border-primary/20
                                                   hover:bg-primary/20 hover:border-primary/40 hover:shadow-[0_0_12px_rgba(0,229,255,0.15)]
                                                   transition-all duration-300 cursor-default"
                                    >
                                        {tool}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        {/* Performance Bar Chart */}
                        <div className="p-5 rounded-xl bg-primary/5 border border-primary/10">
                            <p className="text-primary font-bold mb-4 tracking-wider text-sm uppercase">Rendimiento por Canal</p>
                            <div className="space-y-4">
                                {performanceBars.map((bar, i) => (
                                    <div key={bar.label}>
                                        <div className="flex justify-between text-xs mb-1.5">
                                            <span className="text-muted-foreground font-mono">{bar.label}</span>
                                            <span className="text-foreground font-bold">{bar.pct}%</span>
                                        </div>
                                        <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                className={`h-full rounded-full bg-gradient-to-r ${bar.color}`}
                                                style={{ boxShadow: `0 0 12px ${bar.glow}` }}
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${bar.pct}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.4, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                </motion.div>
            </div>
        </section>
    );
};

export default AnalyticsSection;