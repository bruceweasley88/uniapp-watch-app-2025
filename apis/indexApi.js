import { get } from './requset.js'

/**
 * @description 提交用户反馈
 * @param {Object} data - 请求参数对象
 * @param {string} data.token - 用户认证令牌
 * @param {string} data.content - 反馈内容
 * @param {string} [data.contact] - 联系方式（可选）
 * @param {string} [data.images] - 图片列表（JSON字符串，可选）
 * @returns {Promise<Object>} 返回Promise对象，包含提交结果
 */
export const indexAddFeedback = (data) => {
  return get('/api/index/addFeedBack', data)
}

/**
 * @description 获取系统配置信息
 * @returns {Promise<Object>} 返回Promise对象，包含系统配置信息
 */
export const indexGetConfigInfo = () => {
  return get('/api/index/getConfigInfo')
}

/**
 * @description 获取首页内容信息
 * @returns {Promise<Object>} 返回Promise对象，包含首页内容配置
 */
export const indexGetHomeContentInfo = () => {
  return get('/api/index/getHomeContentInfo')
}

/**
 * @description 获取首页数据
 * @returns {Promise<Object>} 返回Promise对象，包含首页完整数据
 */
export const indexGetHomePage = () => {
  return get('/api/index/getHomePage')
}

/**
 * @description 获取首页帖子信息
 * @returns {Promise<Object>} 返回Promise对象，包含首页推荐帖子列表
 */
export const indexGetHomePostInfo = () => {
  return get('/api/index/getHomePostInfo')
}

/**
 * @description 获取首页顶部信息
 * @returns {Promise<Object>} 返回Promise对象，包含首页顶部banner和公告等
 */
export const indexGetHomeTopInfo = () => {
  return get('/api/index/getHomeTopInfo')
}

/**
 * @description 获取首页用户数据
 * @param {Object} data - 请求参数对象
 * @param {string} data.token - 用户认证令牌
 * @returns {Promise<Object>} 返回Promise对象，包含用户在首页的统计数据
 */
export const indexGetHomeUserData = (data) => {
  return get('/api/index/getHomeUserData', data)
}

/**
 * @description 获取素材分类列表
 * @returns {Promise<Object>} 返回Promise对象，包含素材分类数据
 */
export const indexGetMaterialCategory = () => {
  return get('/api/index/getMaterialCategory')
}

/**
 * @description 获取素材图片列表
 * @param {Object} data - 请求参数对象
 * @param {string} data.categoryId - 分类ID
 * @param {number} [data.page] - 当前页码
 * @param {number} [data.limit] - 每页显示条数
 * @returns {Promise<Object>} 返回Promise对象，包含素材图片列表
 */
export const indexGetMaterialPicture = (data) => {
  return get('/api/index/getMaterialPicture', data)
}

/**
 * @description 获取上传授权信息
 * @param {Object} data - 请求参数对象
 * @param {string} data.token - 用户认证令牌
 * @param {string} [data.type] - 上传类型
 * @returns {Promise<Object>} 返回Promise对象，包含上传授权信息
 */
export const indexGetUploadAuth = (data) => {
  return get('/api/index/getUploadAuth', data)
}

/**
 * @description 更新等待数量
 * @returns {Promise<Object>} 返回Promise对象，包含更新结果
 */
export const indexUpdateWaitNum = () => {
  return get('/api/index/updateWaitNum')
}