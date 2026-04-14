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
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'framer-motion': ['framer-motion'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'supabase': ['@supabase/supabase-js'],
          'icons': ['lucide-react', 'react-icons']
        }
      }
    }
  }
})
