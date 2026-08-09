import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import prerender from 'vite-plugin-prerender'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    prerender({
      staticDir: 'dist',
      routes: ['/', '/about', '/services', '/contact', '/privacy'],
    }),
  ],
})