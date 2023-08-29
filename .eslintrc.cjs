/*
 * @Author: huwanfei
 * @Date: 2023-08-25 15:03:54
 * @LastEditTime: 2023-08-29 14:51:18
 * @LastEditors: huwanfei
 * @Description:  
 * @FilePath: /cesium-3d/.eslintrc.cjs
 */

/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    './.eslintrc-auto-import.json'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/multi-word-component-names': [
      0
    ]
  }
}
