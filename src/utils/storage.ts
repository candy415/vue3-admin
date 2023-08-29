/*
 * @Author: shi hong yu
 * @Date: 2023-05-23 11:25:43
 * @LastEditors: huwanfei
 * @LastEditTime: 2023-08-18 15:26:09
 * @Description: 存储配置
 */
export const getToken = () => localStorage.getItem('TOKEN')
export const setToken = (token: string) => localStorage.setItem('TOKEN', token)
export const removeToken = () => localStorage.removeItem('TOKEN')

export const getTenantCode = () => localStorage.getItem('TENANTCODE')
export const setTenantCode = (code: string) => localStorage.setItem('TENANTCODE', code)
export const removeTenantCode = () => localStorage.removeItem('TENANTCODE')

export const getDomainName = () => localStorage.getItem('DOMAINNAME')
export const setDomainName = (code: string) => localStorage.setItem('DOMAINNAME', code)
export const removeDomainName = () => localStorage.removeItem('DOMAINNAME')

export const removeAll = () => {
  localStorage.removeItem('TOKEN')
  localStorage.removeItem('TENANTCODE')
  localStorage.removeItem('DOMAINNAME')
  localStorage.removeItem('ORGOBJ') // 组织信息
}
