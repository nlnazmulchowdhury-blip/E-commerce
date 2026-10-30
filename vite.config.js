import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import uploadPlugin from './upload-plugin.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), uploadPlugin()],
})
