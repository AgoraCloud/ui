import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'
import { exit } from 'process'
// import {esbuildCommonjs} from '@originjs/vite-plugin-commonjs'

const SRC_PATH = path.resolve(__dirname, './src/')

const proxyTarget = process.env.PROXY_TARGET
if (!proxyTarget) {
  console.error("NO PROXY TARGET DEFINED")
  console.warn("please set an ENV variable PROXY_TARGET=https://agoracloud.YOURDOMAIN.com")
  exit()
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // esbuildCommonjs(['events', '@mars-man/models/node_modules/events']),
    reactRefresh()
  ],
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
    exclude: [
      // this is for npm link local development
      "@mars-man/models",
      // this is to handle swagger commonjs
      "@nestjs/swagger",
      "swagger-ui-express",
      "fastify-swagger",
      "cache-manager"
    ]
  }
})
