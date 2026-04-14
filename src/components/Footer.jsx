import React from 'react';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { data } from '../lib/data';

export const Footer = () => {
    const name = data.personal.name.split(' ')[0];

    return (
        <footer className="pt-12 pb-6 border-t border-primary/6 bg-[#06090f]/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 text-center">

                <div className="flex justify-center space-x-6 mb-6">
                    <a href="https://linkedin.com/in/mateocanibanoes" target="_blank" rel="noopener noreferrer"
                       className="text-foreground/40 hover:text-primary transition-all duration-300 text-2xl
                                  hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                       aria-label="LinkedIn de Mateo Cañibano">
                        <FaLinkedinIn />
                    </a>
                    <a href="https://github.com/mateocanibanoes" target="_blank" rel="noopener noreferrer"
                       className="text-foreground/40 hover:text-primary transition-all duration-300 text-2xl
                                  hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                       aria-label="GitHub de Mateo Cañibano">
                        <FaGithub />
                    </a>
                </div>

                <p className="text-sm text-muted-foreground/40 font-mono tracking-widest">
                    {name} | {new Date().getFullYear()} © Todos los derechos reservados
                </p>

            </div>
        </footer>
    );
};