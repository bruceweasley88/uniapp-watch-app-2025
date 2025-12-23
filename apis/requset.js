const url = 'http://47.115.204.186:8088'

const request = (options) => {
  const token = uni.getStorageSync('token')
  const data = { ...options.data, token }

  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      url: url + options.url,
      data,
      success: (res) => {
        if (res.data.code === 401) {
          uni.navigateTo({ url: '/pages/login/login' })
          uni.showToast({
            title: '请先登录',
            icon: 'none',
            duration: 2000
          });
          throw new Error('请先登录');
        }
        if (res.data.code !== 200) {
          uni.showToast({
            title: res.data.msg || 'Request failed',
            icon: 'none',
            duration: 2000
          });
          throw new Error(res.data.msg);
        }
        resolve(res.data)
      },
      fail: reject
    })
  })
}

export const get = (url, data) => {
  return request({ url, method: 'GET', data })
}

export const post = (url, data) => {
  return request({ url, method: 'POST', data })
}