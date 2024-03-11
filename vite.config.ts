import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/wish-factory/",
  plugins: [react()],
  build: {
    outDir: 'build' // указываем каталог для сборки
  }
});
