import en from './en.js'

const messages = {
	en
}

export function setLanguage(lang) {
	uni.setStorageSync('language', lang)
}

export function getLanguage() {
	return uni.getStorageSync('language') || 'en'
}

export function t(key) {
	const lang = getLanguage()
	return messages[lang]?.[key] || key
}

export function initLanguage() {
	if (!uni.getStorageSync('language')) {
		uni.setStorageSync('language', 'en')
	}
	return getLanguage()
}
