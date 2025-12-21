import { get, post } from './requset.js'

/**
 * @description 新增血氧记录
 * @param {Object} data - 请求参数对象
 * @param {string} data.deviceSn - 设备序列号
 * @param {string} data.heartRate - 脉率值
 * @param {string} data.saturation - 血氧饱和度（95%传95）
 * @param {string} data.token - 用户认证令牌
 * @returns {Promise<Object>} 返回Promise对象，包含API响应数据
 */
export const bloodOxygenAddRecord = (data) => {
  return get('/api/bloodOxygen/addRecord', data)
}

/**
 * @description 批量新增血氧记录
 * @param {Object} data - 请求参数对象
 * @param {string} [data.deviceSn] - 设备序列号
 * @param {string} data.records - 血氧记录数据（JSON字符串格式）
 * @param {string} data.token - 用户认证令牌
 * @returns {Promise<Object>} 返回Promise对象，包含API响应数据
 */
export const bloodOxygenBatchAddRecord = (data) => {
  return post('/api/bloodOxygen/batchAddRecord', data)
}

/**
 * @description 删除血氧记录
 * @param {Object} data - 请求参数对象
 * @param {string|number} data.recordId - 记录ID
 * @param {string} data.token - 用户认证令牌
 * @returns {Promise<Object>} 返回Promise对象，包含API响应数据
 */
export const bloodOxygenDelRecord = (data) => {
  return get('/api/bloodOxygen/delRecord', data)
}

/**
 * @description 获取用户血氧记录列表
 * @param {Object} data - 请求参数对象
 * @param {number} [data.limit] - 每页显示条数
 * @param {number} [data.page] - 当前页码
 * @param {string} [data.searchDate] - 搜索日期范围（格式：2023-08-31,2023-09-02）
 * @param {string} data.token - 用户认证令牌
 * @returns {Promise<Object>} 返回Promise对象，包含血氧记录列表数据
 */
export const bloodOxygenGetRecordList = (data) => {
  return get('/api/bloodOxygen/getRecordList', data)
}