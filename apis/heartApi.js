import { get, post } from './requset.js'

/**
 * @description 新增心率记录
 * @param {Object} data - 请求参数对象
 * @param {string} data.deviceSn - 设备序列号
 * @param {string} data.heartRate - 心率值
 * @param {string} data.token - 用户认证令牌
 * @returns {Promise<Object>} 返回Promise对象，包含API响应数据
 */
export const heartAddRecord = (data) => {
  return get('/api/heart/addRecord', data)
}

/**
 * @description 批量新增心率记录
 * @param {Object} data - 请求参数对象
 * @param {string} [data.deviceSn] - 设备序列号
 * @param {string} data.records - 心率记录数据（JSON字符串格式）
 * @param {string} data.token - 用户认证令牌
 * @returns {Promise<Object>} 返回Promise对象，包含API响应数据
 */
export const heartBatchAddRecord = (data) => {
  return post('/api/heart/batchAddRecord', data)
}

/**
 * @description 删除心率记录
 * @param {Object} data - 请求参数对象
 * @param {string|number} data.recordId - 记录ID
 * @param {string} data.token - 用户认证令牌
 * @returns {Promise<Object>} 返回Promise对象，包含API响应数据
 */
export const heartDelRecord = (data) => {
  return get('/api/heart/delRecord', data)
}

/**
 * @description 获取用户心率记录列表
 * @param {Object} data - 请求参数对象
 * @param {number} [data.limit] - 每页显示条数
 * @param {number} [data.page] - 当前页码
 * @param {string} [data.searchDate] - 搜索日期范围（格式：2023-08-31,2023-09-02）
 * @param {string} data.token - 用户认证令牌
 * @returns {Promise<Object>} 返回Promise对象，包含心率记录列表数据
 */
export const heartGetRecordList = (data) => {
  return get('/api/heart/getRecordList', data)
}