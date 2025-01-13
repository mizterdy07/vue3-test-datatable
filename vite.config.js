import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@remixicon': path.resolve(__dirname, 'node_modules/remixicon/fonts'),
    },
  },
})
