// tailwind.config.js - Corregido para ESM

// 🟢 CORRECCIÓN: Usamos la sintaxis 'import' moderna
import defaultTheme from 'tailwindcss/defaultTheme'; 

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                // Ahora 'defaultTheme' se importa correctamente
                sans: ['JetBrains Mono', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [],
};