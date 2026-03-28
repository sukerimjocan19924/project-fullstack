import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   port: 5174,        // 원하는 포트 번호
  //   host: '0.0.0.0',   // 컨테이너 안에서 외부 접근 가능하게(npm run dev 사용)
  // },
})
