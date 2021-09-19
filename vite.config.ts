import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'


const SRC_PATH = path.resolve(__dirname, './src/')

console.log(SRC_PATH)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  root: SRC_PATH,
  resolve: {
    alias: {
      'app': path.resolve(__dirname, './src/app'),
      '@styles': path.resolve(__dirname, './src/app/styles')
    }
  },
  build: {
    outDir: '../build',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000
  },
  server: {
    proxy: {
      '/api': 'https://marc.agoracloud.saidghamra.com',
    }
  }
})
