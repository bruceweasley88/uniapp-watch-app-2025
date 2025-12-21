import { get, post } from './requset.js'

/**
 * @description 新增血压记录
 * @param {Object} data - 请求参数对象
 * @param {Object} data.bloodPressureDto - 血压数据传输对象
 * @param {string} data.token - 用户认证令牌
 * @returns {Promise<Object>} 返回Promise对象，包含API响应数据
 */
export const bloodPressureAddRecord = (data) => {
  return post('/api/bloodPressure/addRecord', data)
}

/**
 * @description 删除血压记录
 * @param {Object} data - 请求参数对象
 * @param {string|number} data.recordId - 记录ID
 * @param {string} data.token - 用户认证令牌
 * @returns {Promise<Object>} 返回Promise对象，包含API响应数据
 */
export const bloodPressureDelRecord = (data) => {
  return get('/api/bloodPressure/delRecord', data)
}

/**
 * @description 获取用户血压记录列表
 * @param {Object} data - 请求参数对象
 * @param {number} data.limit - 每页显示条数
 * @param {number} data.page - 当前页码
 * @param {string} data.token - 用户认证令牌
 * @returns {Promise<Object>} 返回Promise对象，包含血压记录列表数据
 */
export const bloodPressureGetRecordList = (data) => {
  return get('/api/bloodPressure/getRecordList', data)
}