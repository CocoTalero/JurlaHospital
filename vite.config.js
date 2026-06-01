import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/JurlaHospital/',
  plugins: [react()],
<<<<<<< HEAD
  assetsInclude: ['**/*.csv', '**/*.jpeg', '**/*.jpg']
=======
  assetsInclude: ['**/*.csv', '**/*.jpeg', '**/*.jpg', '**/*.png']
>>>>>>> 6eef36a (Fix image and CSV imports for GitHub Pages deployment)
})
