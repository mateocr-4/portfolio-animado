import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ConsoleInput } from '../components/ConsoleInput';
import { ConsoleTextarea } from '../components/ConsoleTextarea';

const ContactSection = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle');

    const handleChange = (e) => {
        setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ 'form-name': 'contact', ...formState }).toString(),
            });
            if (response.ok) { setStatus('success'); setFormState({ name: '', email: '', message: '' }); }
            else { setStatus('error'); }
        } catch { setStatus('error'); }
    };

    const register = (name) => ({ name, value: formState[name], onChange: handleChange });

    return (
        <section id="contacto" className="py-24 md:py-32 relative overflow-hidden" aria-label="Formulario de contacto">
            <div className="max-w-xl mx-auto px-6">

                <motion.h2
                    className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-shimmer"
                    initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    Contacto
                </motion.h2>

                <motion.p
                    className="text-center text-muted-foreground mb-12 text-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    ¿Listo para colaborar? Escríbeme
                </motion.p>

                <motion.form
                    name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field"
                    className="p-8 rounded-2xl glass-deep"
                    initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    onSubmit={handleSubmit}
                >
                    <input type="hidden" name="form-name" value="contact" />
                    <p className="hidden"><input name="bot-field" /></p>

                    <ConsoleInput id="name" label="Nombre completo" register={register('name')} />
                    <ConsoleInput id="email" label="Email de contacto" type="email" register={register('email')} placeholder=">> ejemplo@email.com" />
                    <ConsoleTextarea id="message" label="Mensaje" rows={5} register={register('message')} />

                    <motion.button
                        type="submit" disabled={status === 'sending'}
                        className="w-full py-3.5 mt-4 text-lg font-bold rounded-xl
                                   bg-gradient-to-r from-primary to-emerald-400 text-primary-foreground
                                   shadow-lg shadow-primary/15 hover:shadow-xl hover:shadow-primary/25
                                   disabled:opacity-60 disabled:cursor-wait transition-all duration-300"
                        whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    >
                        {status === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
                    </motion.button>

                    {status === 'success' && (
                        <motion.p className="mt-4 text-center text-sm font-mono text-primary"
                                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                            ✓ Mensaje enviado correctamente. Te responderé pronto.
                        </motion.p>
                    )}
                    {status === 'error' && (
                        <motion.p className="mt-4 text-center text-sm font-mono text-red-400"
                                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                            ✗ Algo falló. Inténtalo de nuevo o contáctame por LinkedIn.
                        </motion.p>
                    )}
                </motion.form>

            </div>
        </section>
    );
};

export default ContactSection;