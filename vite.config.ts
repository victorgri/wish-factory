import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/", // устанавливаем базовый путь в корень
  plugins: [react()],
  server: {
    host: '0.0.0.0', // указываем хост
    port: 8080 // указываем порт
  }
});
