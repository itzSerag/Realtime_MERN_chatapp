import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({

  build: {
    outDir: "public"  // Change from "dist" to "public"
  },
  server: {
    proxy: {
      '/api/v1': {
        target: 'https://vercel.com/serag-eldeins-projects/chatty-serageldien-project', // Use the actual deployed backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },

  plugins: [
    react(),

  ],
})
