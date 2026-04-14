import React from 'react';

/**
 * Componente de Input estilizado como una línea de consola.
 */
export const ConsoleInput = ({ id, label, type = 'text', register, error, placeholder = ">> INGRESE DATOS" }) => {
    return (
        <div className="mb-6">
            <label htmlFor={id} className="block text-sm font-mono text-primary mb-2">
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    type={type}
                    className={`w-full font-mono text-foreground bg-background border-2 ${
                        error ? 'border-destructive' : 'border-border hover:border-primary/60 focus:border-primary'
                    } rounded-lg py-3 px-4 transition-all duration-300 placeholder:text-muted-foreground/50 focus:outline-none`}
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