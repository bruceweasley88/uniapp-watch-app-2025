const time = 300;

/**
 * 页面切换
 */
export const navigateTo = (...args) => {
  setTimeout(() => uni.navigateTo(...args), time)
}

/**
 * 页面返回
 */
export const navigateBack = (...args) => {
  setTimeout(() => uni.navigateBack(...args), time)
}

/**
 * 页面切换
 */
export const switchTab = (...args) => {
  setTimeout(() => uni.switchTab(...args), time)
}


/**
 * 页面切换
 */
export const redirectTo = (...args) => {
  setTimeout(() => uni.navigateBack(...args), time)
}
