import { get, post, baseUrl } from './requset.js'

/**
 * @description 获取国家列表
 * @returns {Promise<Object>} 返回Promise对象，包含国家列表数据
 */
export const commonGetCountry = () => {
  return get('/api/common/getCountry')
}

/**
 * @description 获取首页轮播图
 * @returns {Promise<Object>} 返回Promise对象，包含轮播图列表数据
 */
export const commonGetIndexBanner = () => {
  return get('/api/common/indexBanner')
}

/**
 * @description 发送邮箱验证码
 * @param {Object} data - 请求参数对象
 * @param {string} data.email - 邮箱地址
 * @param {string} [data.type] - 验证码类型（login/register/reset）
 * @returns {Promise<Object>} 返回Promise对象，包含发送结果
 */
export const commonSendEmailCode = (data) => {
  return get('/api/common/sendEmailCode', data)
}

/**
 * @description 发送短信验证码
 * @param {Object} data - 请求参数对象
 * @param {string} data.phone - 手机号码
 * @param {string} [data.areaCode] - 区号，默认86
 * @param {string} [data.type] - 验证码类型（login/register/reset）
 * @returns {Promise<Object>} 返回Promise对象，包含发送结果
 */
export const commonSendSmsCode = (data) => {
  return get('/api/common/sendSmsCode', data)
}

/**
 * @description 文件上传
 * @param {Object} data - 请求参数对象
 * @param {FormData} data.file - 要上传的文件
 * @param {string} [data.type] - 上传类型（avatar/image等）
 * @returns {Promise<Object>} 返回Promise对象，包含上传后的文件信息
 */
export const commonUpload = (data) => {
  return post('/api/common/upload', data)
}

/**
 * @description 上传图片文件
 * @param {string} filePath - 本地文件路径
 * @returns {Promise<Object>} 返回Promise对象，包含上传后的文件URL
 */
export const commonUploadImage = (filePath) => {
  const token = uni.getStorageSync('token')

  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: baseUrl + '/api/common/upload',
      filePath,
      name: 'file',
      formData: { token },
      success: (res) => {
        const data = JSON.parse(res.data)
        if (data.code === 200) {
          resolve(data)
        } else {
          uni.showToast({ title: data.msg || '上传失败', icon: 'none' })
          reject(data)
        }
      },
      fail: (err) => {
        uni.showToast({ title: '上传失败', icon: 'none' })
        reject(err)
      }
    })
  })
}