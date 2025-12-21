const request = (options) => {
  const token = uni.getStorageSync('token')
  const data = { ...options.data, token }

  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      data,
      success: (res) => {
        if (res.data.code === 401) {
          uni.navigateTo({ url: '/pages/login/login' })
          return
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