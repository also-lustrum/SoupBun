import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        {
          vue: [
            'ref',
            'reactive',
            'watch',
            'onBeforeUnmount',
            'onMounted',
            'onDeactivated',
            'onActivated',
            'computed',
            'defineProps',
            'defineEmits',
            'nextTick'
          ],
          '@/shared/general.ts': [
            'isArray',
            'isString',
            'isSymbol',
            'isObject',
            'isFunction',
            'isMap',
            'isSet',
            'isRegExp',
            'isPromise',
            'isPlainObject',
            'toTypeString',
            'hasOwn'
          ]
        }
      ],
      
  })],
  server: {
    host: "localhost",
    port: 8088,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
})
