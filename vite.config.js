import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // This makes the server accessible on your local network
    // You can also specify a port if you don't want to use the default (5173)
    // port: 3000,
  }
})