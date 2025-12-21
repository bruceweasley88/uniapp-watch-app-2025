import { get } from './requset.js'

/**
 * @description 获取应用版本信息
 * @param {Object} data - 请求参数对象
 * @param {string} [data.platform] - 平台类型（ios/android）
 * @param {string} [data.version] - 当前版本号
 * @returns {Promise<Object>} 返回Promise对象，包含最新版本信息
 */
export const configGetAppVersion = (data) => {
  return get('/api/config/getAppVersion', data)
}

/**
 * @description 获取审核配置信息
 * @returns {Promise<Object>} 返回Promise对象，包含审核相关配置
 */
export const configGetAudit = () => {
  return get('/api/config/getAudit')
}