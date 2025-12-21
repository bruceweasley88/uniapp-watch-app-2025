import { get } from './requset.js'

/**
 * @description 绑定设备
 * @param {Object} data - 请求参数对象
 * @param {string} data.token - 用户认证令牌
 * @param {string} data.deviceSn - 设备序列号
 * @param {string} [data.deviceName] - 设备名称（可选）
 * @returns {Promise<Object>} 返回Promise对象，包含绑定结果
 */
export const deviceBinding = (data) => {
  return get('/api/device/binding', data)
}

/**
 * @description 获取设备信息
 * @param {Object} data - 请求参数对象
 * @param {string} data.token - 用户认证令牌
 * @param {string} data.deviceSn - 设备序列号
 * @returns {Promise<Object>} 返回Promise对象，包含设备详细信息
 */
export const deviceGetInfo = (data) => {
  return get('/api/device/getInfo', data)
}

/**
 * @description 根据用户ID获取设备列表
 * @param {Object} data - 请求参数对象
 * @param {string} data.token - 用户认证令牌
 * @returns {Promise<Object>} 返回Promise对象，包含用户绑定的设备列表
 */
export const deviceGetListByUser = (data) => {
  return get('/api/device/getListByUserId', data)
}

/**
 * @description 解绑设备
 * @param {Object} data - 请求参数对象
 * @param {string} data.token - 用户认证令牌
 * @param {string} data.deviceSn - 设备序列号
 * @returns {Promise<Object>} 返回Promise对象，包含解绑结果
 */
export const deviceUnbinding = (data) => {
  return get('/api/device/unBinding', data)
}