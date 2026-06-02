import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/JurlaHospital/',
  plugins: [react()],
  assetsInclude: ['**/*.csv', '**/*.jpeg', '**/*.jpg']
})
