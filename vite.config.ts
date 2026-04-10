import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      formats: ['es', 'cjs'],
      name: 'AnimatedCounter',
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: (format: string) => `index.${format}.js`,
    },
    rolldownOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
          '__dirname': '__dirname',
        },
      },
    },
  },
});
