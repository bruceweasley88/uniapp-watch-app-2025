import { get, post } from './requset.js'

/**
 * @description 验证码登录
 * @param {Object} data - 请求参数对象
 * @param {string} data.phone - 手机号码
 * @param {string} data.code - 验证码
 * @param {string} [data.areaCode] - 区号，默认86
 * @returns {Promise<Object>} 返回Promise对象，包含登录成功后的用户信息
 */
export const userCodeLogin = (data) => {
  return get('/api/user/codeLogin', data)
}

/**
 * @description 编辑用户信息
 * @param {Object} data - 请求参数对象
 * @param {string} data.token - 用户认证令牌
 * @param {string} [data.nickname] - 用户昵称
 * @param {string} [data.avatar] - 用户头像URL
 * @param {string} [data.sex] - 性别（1男 2女）
 * @param {string} [data.birthday] - 生日（格式：2023-08-31）
 * @param {string} [data.height] - 身高（cm）
 * @param {string} [data.weight] - 体重（kg）
 * @returns {Promise<Object>} 返回Promise对象，包含操作结果
 */
export const userEditInfo = (data) => {
  return post('/api/user/editUserInfo?token=' + uni.getStorageSync('token'), data)
}

/**
 * @description 编辑用户信息（MTB版本）
 * @param {Object} data - 请求参数对象
 * @param {string} data.token - 用户认证令牌
 * @param {string} [data.nickname] - 用户昵称
 * @param {string} [data.avatar] - 用户头像URL
 * @param {string} [data.sex] - 性别（1男 2女）
 * @param {string} [data.birthday] - 生日
 * @returns {Promise<Object>} 返回Promise对象，包含操作结果
 */
export const userEditInfoMTB = (data) => {
  return get('/api/user/editUserInfoMTB', data)
}

/**
 * @description 邮箱验证码登录
 * @param {Object} data - 请求参数对象
 * @param {string} data.email - 邮箱地址
 * @param {string} data.code - 验证码
 * @returns {Promise<Object>} 返回Promise对象，包含登录成功后的用户信息
 */
export const userEmailCodeLogin = (data) => {
  return get('/api/user/emailCodeLogin', data)
}

/**
 * @description 获取国家列表
 * @returns {Promise<Object>} 返回Promise对象，包含国家列表数据
 */
export const userGetCountry = () => {
  return get('/api/user/getCountry')
}

/**
 * @description 获取用户信息
 * @param {Object} data - 请求参数对象
 * @param {string} data.token - 用户认证令牌
 * @returns {Promise<Object>} 返回Promise对象，包含用户详细信息
 */
export const userGetInfo = (data) => {
  return get('/api/user/getUserInfo', data)
}

/**
 * @description 密码登录
 * @param {Object} data - 请求参数对象
 * @param {string} data.phone - 手机号码
 * @param {string} data.password - 登录密码
 * @param {string} data.terminal - 终端类型：固定1
 * @param {string} [data.areaCode] - 区号，默认86
 * @returns {Promise<Object>} 返回Promise对象，包含登录成功后的用户信息
 */
export const userPasswordLogin = (data) => {
  return get('/api/user/login', data)
}

/**
 * @description 邮箱密码登录
 * @param {Object} data - 请求参数对象
 * @param {string} data.email - 邮箱地址
 * @param {string} data.password - 登录密码
 * @param {string} data.terminal - 终端类型：固定1
 * @returns {Promise<Object>} 返回Promise对象，包含登录成功后的用户信息
 */
export const userEmailLogin = (data) => {
  return get('/api/user/loginByEmail', data)
}

/**
 * @description 用户注册
 * @param {Object} data - 请求参数对象
 * @param {string} data.phone - 手机号码
 * @param {string} data.code - 验证码
 * @param {string} data.password - 登录密码
 * @param {string} [data.areaCode] - 区号，默认86
 * @returns {Promise<Object>} 返回Promise对象，包含注册结果
 */
export const userRegister = (data) => {
  return post('/api/user/register', data)
}

/**
 * @description 邮箱注册
 * @param {Object} data - 请求参数对象
 * @param {string} data.email - 邮箱地址
 * @param {string} data.code - 验证码
 * @param {string} data.password - 登录密码
 * @returns {Promise<Object>} 返回Promise对象，包含注册结果
 */
export const userEmailRegister = (data) => {
  return post('/api/user/registerByEmail', data)
}

/**
 * @description 获取用户报告列表
 * @param {Object} data - 请求参数对象
 * @param {string} data.token - 用户认证令牌
 * @param {number} [data.page] - 当前页码
 * @param {number} [data.limit] - 每页显示条数
 * @returns {Promise<Object>} 返回Promise对象，包含报告列表数据
 */
export const userGetReportList = (data) => {
  return get('/api/user/reportList', data)
}

/**
 * @description 修改密码
 * @param {Object} data - 请求参数对象
 * @param {string} data.phone - 手机
 * @param {string} data.verifyCode - 验证码
 * @param {string} data.newPassword - 新密码
 * @returns {Promise<Object>} 返回Promise对象，包含修改结果
 */
export const updatePsd = (data) => {
  return get('/api/user/updatePsd', data)
}

/**
 * @description 修改密码
 * @param {Object} data - 请求参数对象
 * @param {string} data.email - 手机
 * @param {string} data.verifyCode - 验证码
 * @param {string} data.newPassword - 新密码
 * @returns {Promise<Object>} 返回Promise对象，包含修改结果
 */
export const updatePsdByEmailCode = (data) => {
  return get('/api/user/updatePsdByEmailCode', data)
}


/**
 * @description 验证邮箱
 * @param {Object} data - 请求参数对象
 * @param {string} data.email - 邮箱地址
 * @returns {Promise<Object>} 返回Promise对象，包含验证结果
 */
export const userVerifyEmail = (data) => {
  return get('/api/user/verifyEmail', data)
}

/**
 * @description 验证手机号
 * @param {Object} data - 请求参数对象
 * @param {string} data.phone - 手机号码
 * @param {string} [data.areaCode] - 区号，默认86
 * @returns {Promise<Object>} 返回Promise对象，包含验证结果
 */
export const userVerifyPhone = (data) => {
  return get('/api/user/verifyPhone', data)
}