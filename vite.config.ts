/*
 * @Author: huwanfei
 * @Date: 2023-08-25 15:03:54
 * @LastEditTime: 2023-08-29 14:45:59
 * @LastEditors: huwanfei
 * @Description:
 * @FilePath: /cesium-3d/vite.config.ts
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import {
  createStyleImportPlugin,
  AndDesignVueResolve
} from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // antd按需引入
    createStyleImportPlugin({
      resolves: [
        AndDesignVueResolve()
      ],
      // 自定义规则
      libs: [
        {
          libraryName: 'ant-design-vue',
          esModule: true,
          resolveStyle: (name) => {
            return `ant-design-vue/es/${name}/style/index`
          }
        }
      ]
    }),
    
    Components({
      dirs: ['src/components'], // 配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import
      resolvers: [AntDesignVueResolver()]
    }),
    
    // 自动引用vue
    autoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-import.d.ts', // 路径下自动生成文件夹存放全局指令
      eslintrc: {
        enabled: false, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成，一旦生成配置文件之后，最好把enable关掉，即改成false
        //否则这个文件每次会在重新加载的时候重新生成，这会导致eslint有时会找不到这个文件。当需要更新配置文件的时候，再重新打开
        filepath: './.eslintrc-auto-import.json', // 生成json文件,可以不配置该项，默认就是将生成在根目录
        globalsPropValue: true
      }
    })
  ],
  // 引用使用less的库要配置一下
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  base: './',
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    open: true,
    port: 8001,
    host: '0.0.0.0', // 支持从IP启动访问
    proxy: {
      '/api': {
        target: 'https://private-dev.ictsoft.cn',
        ws: false, // 如果要代理 websockets，配置这个参数
        changeOrigin: true, // 允许websockets跨域
      }
    }
  }
})
