import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite 설정 (개발 서버 3000 포트)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
});


