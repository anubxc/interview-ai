import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      tailwindcss()
    ],

    // Dev server (local only)
    server: {
      port: parseInt(env.VITE_PORT) || 5173,
    },

    // 👇 ADD THIS (important)
    preview: {
      host: '0.0.0.0',
      port: parseInt(process.env.PORT) || 4173,
    }
  }
})