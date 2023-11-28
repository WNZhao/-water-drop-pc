import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from "vite-plugin-eslint"
import path from "path";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  css: {
    //* css模块化
    modules: { // css模块化 文件以.module.[css|less|scss]结尾
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      hashPrefix: 'prefix',
    },
    //* 预编译支持less
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      },
    }
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve('./src')
      }
    ]
  }
})
