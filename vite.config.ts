import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'


const SRC_PATH = path.resolve(__dirname, './src/')

const proxyTarget = process.env.PROXY_TARGET
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
      '/api': {
        target: proxyTarget,
        changeOrigin: true,
        cookieDomainRewrite: ""
      },
    }
  },
  optimizeDeps: {
    exclude: ["@nestjs/swagger", "swagger-ui-express", "fastify-swagger", "cache-manager"]
  }
})
