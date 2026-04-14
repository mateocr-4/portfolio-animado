import React from 'react';

/**
 * Componente de Textarea estilizado como una línea de consola para mensajes largos.
 */
export const ConsoleTextarea = ({ id, label, rows = 4, register, error, placeholder = ">> INGRESE MENSAJE" }) => {
    return (
        <div className="mb-6">
            <label htmlFor={id} className="block text-sm font-mono text-primary mb-2">
                {label}
            </label>
            <div className="relative">
                <textarea
                    id={id}
                    rows={rows}
                    className={`w-full font-mono text-foreground bg-background border-2 ${
                        error ? 'border-destructive' : 'border-border hover:border-primary/60 focus:border-primary'
                    } rounded-lg py-3 px-4 transition-all duration-300 placeholder:text-muted-foreground/50 focus:outline-none resize-none`}
                    placeholder={placeholder}
                    {...register}
                />
            </div>
            {error && (
                <p className="mt-1 text-xs text-destructive font-mono">
                    [ERROR] {error.message}
                </p>
            )}
        </div>
    );
};