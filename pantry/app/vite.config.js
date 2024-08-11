import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import wasm from 'vite-plugin-wasm'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
  resolve: {
    alias: {
      router: "/src/router",
      routes: "/src/routes",
      src: "/src/*",
      components: "/src/components",
      assets: "/src/assets",
      lib: "/src/lib",
      context: "/src/context",
      services: "/src/services",
      myfirebase: "/src/firebase",
    },
    build: {
      rollupOptions: {
        external: [
          'firebase/app'
        ]
      }
    }
  }
})
