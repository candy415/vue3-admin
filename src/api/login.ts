/*
 * @Author: huwanfei
 * @Date: 2023-08-25 15:20:29
 * @LastEditTime: 2023-08-25 19:06:40
 * @LastEditors: huwanfei
 * @Description:  
 * @FilePath: /picture-uploader/src/api/login.ts
 */
import { axios } from '@/utils/axios'
const saasPortal = '/api/saas-portal'

// 根据用户名获取密码加密key
export const secretKey = (data: any) => axios.get(`${saasPortal}/auth/secretKey`, data)
// 账号密码登录
export const accountLogin = (data: any) => axios.post(`${saasPortal}/auth/login`, data)
