<!--
 * @Author: huwanfei
 * @Date: 2023-08-25 15:03:54
 * @LastEditTime: 2023-08-25 16:47:19
 * @LastEditors: huwanfei
 * @Description:  
 * @FilePath: /picture-uploader/src/App.vue
-->
<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>

<script setup lang="ts">
// 国际化为中文
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>

