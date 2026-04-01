import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  css:{
    devSourcemap:true
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true,
      interval: 1000,
    },
    hmr: {
      host: 'localhost',
      port: 5173,
    },
  },
  // server: {
  //   port: 5174,        // 원하는 포트 번호
  //   host: '0.0.0.0',   // 컨테이너 안에서 외부 접근 가능하게(npm run dev 사용)
  // },
});
