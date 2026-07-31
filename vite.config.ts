import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// PORT 환경변수를 존중 (preview 하네스가 빈 포트를 할당해 줌). 없으면 5174.
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 모든 인터페이스(IPv4/IPv6)에 바인딩 → localhost/127.0.0.1 모두 접속 가능
    port: Number(process.env.PORT) || 5174,
  },
})
