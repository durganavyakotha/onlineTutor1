import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Add this line to fix the file paths
  base: '/onlineTutor/',

  plugins: [react()],
})