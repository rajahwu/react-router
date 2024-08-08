import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      router: "/src/router",
      routes: "/src/routes",
      src: "/src/*",
      components: "/src/components",
      assets: "/src/assets",
      lib: "/src/lib",
      context: "/src/context",
      services: "/src/services"
    }
  }
})
