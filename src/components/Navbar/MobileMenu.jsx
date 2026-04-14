import React from 'react';
import { motion } from 'framer-motion';
import { data } from '../../lib/data';

const navItems = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Sobre Mí', href: '#sobre-mi' },
    { name: 'Experiencia', href: '#experiencia' },
    { name: 'Proyectos', href: '#proyectos' },
    { name: 'Contacto', href: '#contacto' },
];

const menuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
    exit: { opacity: 0, x: "100%", transition: { duration: 0.3 } }
};

const linkVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: { delay: i * 0.1 },
    }),
};

/**
 * Subcomponente del menú de navegación móvil.
 */
export const MobileMenu = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <motion.nav
            className="fixed top-0 right-0 h-full w-full bg-card/97 backdrop-blur-md z-40 md:hidden p-8 border-l border-border/30"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className="flex justify-end">
                <button
                    onClick={onClose}
                    className="text-primary hover:text-primary/70 transition-colors text-3xl p-2"
                    aria-label="Cerrar menú"
                >
                    &times;
                </button>
            </div>

            <ul className="flex flex-col items-start space-y-8 mt-12">
                {navItems.map((item, index) => (
                    <motion.li
                        key={item.name}
                        custom={index}
                        variants={linkVariants}
                        initial="hidden"
                        animate="visible"
                        className="w-full"
                    >
                        <a
                            href={item.href}
                            onClick={onClose}
                            className="block text-4xl font-mono text-foreground hover:text-primary transition-colors py-2 border-b border-border/30"
                        >
                            <span className="text-primary font-bold mr-2">{'>'}</span> {item.name}
                        </a>
                    </motion.li>
                ))}
            </ul>

            <div className="absolute bottom-10 left-8 text-sm text-muted-foreground font-mono">
                <p>CONTACTO {data.personal.name}</p>
                <p>STATUS: <span className="text-primary">ACTIVE</span></p>
            </div>
        </motion.nav>
    );
};