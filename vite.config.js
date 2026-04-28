import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/okcashbag-shopping-agent/',
  plugins: [react(), tailwindcss()],
})
