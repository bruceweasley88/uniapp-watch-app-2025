import { get } from './requset.js'

/**
 * @description 新增体重记录
 * @param {Object} data - 请求参数对象
 * @param {string} data.token - 用户认证令牌
 * @param {string} data.weight - 体重值（kg）
 * @param {string} data.deviceSn - 设备序列号
 * @param {string} [data.recordTime] - 记录时间（格式：2023-08-31 12:00:00）
 * @returns {Promise<Object>} 返回Promise对象，包含新增结果
 */
export const weightAddRecord = (data) => {
  return get('/api/weight/addRecord', data)
}

/**
 * @description 删除体重记录
 * @param {Object} data - 请求参数对象
 * @param {string} data.token - 用户认证令牌
 * @param {string|number} data.recordId - 记录ID
 * @returns {Promise<Object>} 返回Promise对象，包含删除结果
 */
export const weightDelRecord = (data) => {
  return get('/api/weight/delRecord', data)
}

/**
 * @description 获取体重记录列表
 * @param {Object} data - 请求参数对象
 * @param {string} data.token - 用户认证令牌
 * @param {number} [data.limit] - 每页显示条数
 * @param {number} [data.page] - 当前页码
 * @param {string} [data.searchDate] - 搜索日期范围（格式：2023-08-31,2023-09-02）
 * @param {string} [data.deviceSn] - 设备序列号
 * @returns {Promise<Object>} 返回Promise对象，包含体重记录列表
 */
export const weightGetRecordList = (data) => {
  return get('/api/weight/getRecordList', data)
}