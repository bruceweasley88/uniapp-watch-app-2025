import { get, post } from './requset.js'

/**
 * @description 获取心电图PDF
 * @param {Object} data - 请求参数对象
 * @param {string} data.fileId - 文件ID
 * @param {string} data.token - 用户认证令牌
 * @returns {Promise<Object>} 返回Promise对象，包含PDF文件数据
 */
export const heartRateCardiogram = (data) => {
  return post('/api/heartRate/cardiogram', data)
}

/**
 * @description 心电图数据计算获取详情
 * @param {Object} data - 请求参数对象
 * @param {string} data.fileId - 文件ID
 * @param {string} data.token - 用户认证令牌
 * @returns {Promise<Object>} 返回Promise对象，包含计算结果数据
 */
export const heartRateCompute = (data) => {
  return post('/api/heartRate/compute', data)
}

/**
 * @description 删除心电记录
 * @param {Object} data - 请求参数对象
 * @param {string} data.id - 记录ID
 * @param {string} data.token - 用户认证令牌
 * @returns {Promise<Object>} 返回Promise对象，包含API响应数据
 */
export const heartRateDeleteRecord = (data) => {
  return post('/api/heartRate/delete', data)
}

/**
 * @description 获取用户心电图记录列表
 * @param {Object} data - 请求参数对象
 * @param {number} [data.limit] - 每页显示条数
 * @param {number} [data.page] - 当前页码
 * @param {string} [data.searchDate] - 搜索日期范围（格式：2023-08-31,2023-09-02）
 * @param {string} data.token - 用户认证令牌
 * @returns {Promise<Object>} 返回Promise对象，包含心电图记录列表数据
 */
export const heartRateGetRecordList = (data) => {
  return get('/api/heartRate/getRecordList', data)
}

/**
 * @description 获取心电数据
 * @param {Object} data - 请求参数对象
 * @param {string} data.fileId - 文件ID
 * @param {string} data.token - 用户认证令牌
 * @returns {Promise<Object>} 返回Promise对象，包含心电绘图数据
 */
export const heartRateSingleDrawdata = (data) => {
  return post('/api/heartRate/single/drawdata', data)
}

/**
 * @description 上传心电图数据文件
 * @param {Object} data - 请求参数对象
 * @param {string} data.deviceSn - 设备序列号
 * @param {File} data.file - 心电图数据文件
 * @param {string} data.token - 用户认证令牌
 * @returns {Promise<Object>} 返回Promise对象，包含上传结果
 */
export const heartRateUpload = (data) => {
  return post('/api/heartRate/upload', data)
}