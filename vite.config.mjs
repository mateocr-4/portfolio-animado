import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// 👇 IMPORTA tu configuración personalizada
import tailwindConfig from './tailwind.config.js'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      config: tailwindConfig, // 👈 OBLIGATORIO para Tailwind 4 + Vite
    }),
  ],
})
