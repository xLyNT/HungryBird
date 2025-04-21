import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (/\.(png|jpe?g|gif|svg)$/.test(assetInfo.name || '')) {
            return 'assets/images/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  },
  base: './'
})