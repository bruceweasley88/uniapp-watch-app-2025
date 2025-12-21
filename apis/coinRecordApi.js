import { get } from './requset.js'

/**
 * @description 申请提现金币
 * @param {Object} data - 请求参数对象
 * @param {string} data.token - 用户认证令牌
 * @param {number} data.amount - 提现金额
 * @param {string} [data.account] - 提现账户（支付宝/微信等）
 * @returns {Promise<Object>} 返回Promise对象，包含提现申请结果
 */
export const coinRecordWithdraw = (data) => {
  return get('/api/coinRecord/goToWithdrew', data)
}

/**
 * @description 获取金币记录列表
 * @param {Object} data - 请求参数对象
 * @param {string} data.token - 用户认证令牌
 * @param {number} [data.page] - 当前页码
 * @param {number} [data.limit] - 每页显示条数
 * @param {string} [data.type] - 记录类型（earn/spend/withdraw等）
 * @returns {Promise<Object>} 返回Promise对象，包含金币记录列表
 */
export const coinRecordGetList = (data) => {
  return get('/api/coinRecord/list', data)
}