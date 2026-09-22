import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative assets work both at / and GitHub Pages' /gt12889/ project path.
  base: './',
})
