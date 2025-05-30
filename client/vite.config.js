import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // Escucha en 0.0.0.0 para permitir acceso desde fuera del contenedor
    port: 5173,
    hmr: {
      port: 24678 // Puerto expuesto en docker-compose para HMR
    },
    watch: {
      usePolling: true // Soluciona problemas de cambio de archivos en Docker
    }
  }
})
