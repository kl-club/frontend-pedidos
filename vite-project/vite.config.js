import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Porta fixa do totem: o frontend-dashboard usa a 5173.
  server: {
    port: 5174,
    strictPort: true,
  },
})
