import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useScrollWatcher } from '../../hooks/useScrollWatcher';
import { MobileMenu } from './MobileMenu';
import { data } from '../../lib/data';

const navItems = [
    { name: 'Sobre Mí', href: '#sobre-mi' },
    { name: 'Experiencia', href: '#experiencia' },
    { name: 'Proyectos', href: '#proyectos' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contacto', href: '#contacto' },
];

/**
 * Componente principal de la barra de navegación.
 * Controla el menú móvil y el efecto de cambio de color al hacer scroll.
 */
export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const scrolled = useScrollWatcher(50);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navbarClasses = `fixed w-full z-50 transition-all duration-500 ${
        scrolled
            ? 'bg-[#06090f]/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(16,185,129,0.04)] border-b border-primary/8'
            : 'bg-transparent'
    }`;

    return (
        <>
            <motion.header
                className={navbarClasses}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    {/* Logotipo/Nombre */}
                    <a
                        href="#hero"
                        className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors font-mono hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.35)]"
                    >
                        {data.personal.name.split(' ')[0]}<span className="text-foreground/70">.dev</span>
                    </a>

                    {/* Navegación de Escritorio */}
                    <nav className="hidden md:block">
                        <ul className="flex space-x-6">
                            {navItems.map((item) => (
                                <motion.li
                                    key={item.name}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <a
                                        href={item.href}
                                        className="text-foreground/80 hover:text-primary transition-all duration-300 font-semibold hover:drop-shadow-[0_0_6px_rgba(16,185,129,0.25)]"
                                    >
                                        {item.name}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </nav>

                    {/* Botón de Menú Móvil */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-primary hover:text-primary/80 text-3xl transition-colors z-50"
                        aria-label="Abrir menú de navegación"
                    >
                        ☰
                    </button>
                </div>
            </motion.header>

            <AnimatePresence>
                {isMenuOpen && <MobileMenu isOpen={isMenuOpen} onClose={toggleMenu} />}
            </AnimatePresence>
        </>
    );
};