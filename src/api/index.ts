/*
 * @Author: huwanfei
 * @Date: 2023-08-25 19:06:34
 * @LastEditTime: 2023-08-28 09:38:24
 * @LastEditors: huwanfei
 * @Description:  
 * @FilePath: /picture-uploader/src/api/index.ts
 */

import { axios } from '@/utils/axios'

const prefix = '/api/saas-portal'

export const uploadImg = (data:any) => axios.upload(`${prefix}/fileApi/upload/image`,data)
