import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
// import VueRouter from 'unplugin-vue-router/vite';
import {resolve} from 'path';

export default defineConfig({
  plugins: [
    vue(),
    // VueRouter({
    //   routesFolder: {
    //     src: 'dev/pages',
    //   },
    //   dts: 'dev/typings/vue-router.d.ts',
    // }),
  ],
  define: {
    'process.env': {
      VIS_TOKEN:
        'mOU/xmlcqX2WSe7emlOkA684VfhvZj6Dwi57iPEGTUFn2PZXaiw8WBHsvO36W4QlVBAUcHBQYvFDA1B8MoCFRAdqivgqK/oSeF37zLBZ5tvnTS6hQZvBPU7uP/h3QAC0xtfzwMrTHAGGehOxWKLW5YCEmucA4ryJ+sRDNMSWUUvlasnRxrS1kehUSu1w20YBDWGbuHe2Re1dlyrynejtvX+9Iqyc7YYbcUzo63RjwboOh9beVicrqDX8hhNq1bUd6HFs8upc9SPXLhiYQqmn7dTb/FKI7Dgln+EaV5MR8RfxpcuiIXsY9kuWIfhmiv09ojxzOyKP7cL7boXS/0Cp+g==:::2N65mGPFWO6K8TQ2Rm4fp1tnWzjDcTDQfaJ/ED5RWO5DzkSCC/qGZvrr55cziyvZsBOSwFU34NPicPNgwRvGQw==:::VukKv/zgPLAteec8iVxRXMYtW15liBqqPtcM4vlRAAY=',
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: '@root-entry-name: default;',
      },
    },
  },
  build: {
    rollupOptions: {
      input: {dev: resolve(__dirname, 'dev.html')},
      output: {
        name: 'main',
      },
    },
  },
  server: {
    open: '/',
    watch: {
      ignored: ['**/**/config.json', '**/dist/**'],
    },
    proxy: {
      '/api': {
        // target: 'http://127.0.0.1:8090',
        target: 'http://10.225.7.145:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
      '/3d': {
        // target: 'http://127.0.0.1:8090',
        target: 'http://10.225.7.145:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/3d/, '/3d'),
        // configure: (proxy, options) => {
        //   proxy.on('proxyRes', (proxyRes, req, res) => {
        //     proxyRes.headers['Cache-Control'] = 'public, max-age=31536000';
        //   });
        // },
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
      '@common': '/common',
    },
  },
});
