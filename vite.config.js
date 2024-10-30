import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window',
  },
  server: {
    host: '0.0.0.0', // Позволяет доступ с других устройств
    port: 8000, // Порт, на котором будет работать сервер
  },
  cacheDir: false
})

