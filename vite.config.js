import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false
  },
  build: {
    rollupOptions: {
      output: {
        // Libraries change far less often than content: keep them in their own
        // long-cached chunks so a copy edit doesn't re-download React/Framer.
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
