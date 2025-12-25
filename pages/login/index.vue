<template>
	<view class="login-page">
		<!-- 登录卡片容器 -->
		<view class="login-card">
			<!-- 标题区域 -->
			<text class="title">{{ $t('login.hello') }}</text>
			<view class="subtitle">{{ $t('login.welcome') }}</view>

			<!-- 手机号输入组 -->
			<view class="phone-group" v-if="type === 'mobile'">
				<view class="country-code">+86</view>
				<input type="tel" class="phone-input" :placeholder="$t('login.mobileNumber')" v-model="phone" maxlength="11" />
			</view>

			<!-- 邮箱输入组 -->
			<view class="email-group" v-else>
				<input type="email" class="email-input" :placeholder="$t('login.emailAddress')" v-model="email" />
			</view>

			<!-- 密码输入框 -->
			<input type="password" class="password-input" :placeholder="$t('login.password')" v-model="password" />

			<!-- 协议勾选行 -->
			<view class="agreement-row">
				<view :class="`checkbox click-active ${accept ? 'selected' : ''}`" @click="accept = !accept"></view>
				<text @click="accept = !accept">I have read the <text class="color-white">{{ $t('login.userAgreementText') }}</text> and I accept
					it</text>
			</view>

			<!-- 登录按钮（渐变色背景） -->
			<button class="login-btn click-active" @click="login">{{ $t('common.login') }}</button>

			<!-- 辅助链接区域 -->
			<view class="link-row">
				<text class="color-white click-active" @click="goToRegister">{{ $t('login.createNewAccount') }}</text>
				<text>|</text>
				<text class="click-active" @click="goToForgot">{{ $t('login.forgotPassword') }}</text>
			</view>

			<!-- 登录类型切换 -->
			<text class="login-type-link click-active" @click="type = type === 'mobile' ? 'email' : 'mobile'">
				{{ $t('login.loginWith') }} {{ type === 'mobile' ? $t('common.email') : $t('common.mobile') }}
			</text>
		</view>
	</view>
</template>

<script>
import { userPasswordLogin, userEmailLogin } from '@/apis/userApi.js'

export default {
	data() {
		return {
			type: 'mobile',  // 登录类型，默认为手机号登录，可选值：'mobile'（手机号登录）、'email'（邮箱登录）
			accept: true,   // 是否同意用户协议

			// 表单数据
			phone: '',      // 手机号
			email: '',      // 邮箱
			password: ''    // 密码
		}
	},
	onShow() {
		// #ifdef APP-PLUS
		setTimeout(() => plus.navigator.closeSplashscreen(), 300);
		// #endif
	},
	methods: {
		goToRegister() {
			uni.navigateTo({
				url: '/pages/register/index'
			});
		},
		goToForgot() {
			uni.navigateTo({
				url: '/pages/forgot/index'
			});
		},

		// 验证表单
		validateForm() {
			// 验证手机号或邮箱
			if (this.type === 'mobile') {
				if (!this.phone) {
					uni.showToast({ title: this.$t('login.pleaseEnterPhone'), icon: 'none' })
					return false
				}
				if (!/^1[3-9]\d{9}$/.test(this.phone)) {
					uni.showToast({ title: this.$t('login.pleaseEnterValidPhone'), icon: 'none' })
					return false
				}
			} else {
				if (!this.email) {
					uni.showToast({ title: this.$t('login.pleaseEnterEmail'), icon: 'none' })
					return false
				}
				if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
					uni.showToast({ title: this.$t('login.pleaseEnterValidEmail'), icon: 'none' })
					return false
				}
			}

			// 验证密码
			if (!this.password) {
				uni.showToast({ title: this.$t('login.pleaseEnterPassword'), icon: 'none' })
				return false
			}

			// 验证协议
			if (!this.accept) {
				uni.showToast({ title: this.$t('login.pleaseAcceptAgreement'), icon: 'none' })
				return false
			}

			return true
		},

		// 登录
		async login() {
			if (!this.validateForm()) return

			let result
			if (this.type === 'mobile') {
				// 手机号密码登录
				result = await userPasswordLogin({
					phone: this.phone,
					password: this.password,
					terminal: 1,
					deviceToken: 86
				})
			} else {
				// 邮箱密码登录
				result = await userEmailLogin({
					email: this.email,
					password: this.password,
					terminal: 1,
					deviceToken: 86
				})
			}

			// 保存token
			if (result.data && result.data.token) {
				uni.setStorageSync('token', result.data.token)
			}

			uni.hideLoading()
			uni.showToast({ title: this.$t('login.loginSuccess'), icon: 'success' })

			// 跳转到首页
			setTimeout(() => {
				uni.switchTab({
					url: '/pages/home/index'
				})
			}, 1000)
		}
	}
}
</script>

<style scoped>
.login-page {
	width: 100vw;
	height: 100vh;
	background-color: #111217;
	background-image: url('/static/img/bg_top.webp');
	background-position: top;
	background-repeat: no-repeat;
}

.login-card {
	padding: 0 27px;
	padding-top: 120px;
}

.title {
	height: 44px;
	display: inline;
	font-family: 'Alibaba Heavy';
	font-weight: bolder;
	font-size: 32px;
	text-align: left;
	font-style: normal;
	color: transparent;
	background: linear-gradient(to right, #38FFA7, #45F6FF);
	-webkit-background-clip: text;
}

/* 副标题 - 白色字体 */
.subtitle {
	height: 30px;
	font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
	font-weight: 400;
	font-size: 22px;
	color: #FFFFFF;
	text-align: left;
	font-style: normal;
	text-transform: none;
	margin-bottom: 36px;
}

/* 手机号输入组 */
.phone-group {
	display: flex;
	gap: 12px;
	margin-bottom: 20px;
}

.country-code {
	width: 150px;
	height: 64px;
	background: #272935;
	border-radius: 16px 0px 0px 16px;
	color: #FFFFFF;
	font-size: 24px;
	font-weight: bold;
	line-height: 64px;
	text-align: center;
}

.country-code::after {
	content: '';
	display: inline-block;
	background-image: url('/static/img/icon_fillin.webp');
	background-size: cover;
	height: 29rpx;
	width: 32rpx;
	position: relative;
	left: 12rpx;
}

.phone-input {
	height: 64px;
	background: #272935;
	border-radius: 0px 16px 16px 0px;
	color: #FFFFFF;
	font-size: 20px;
	font-weight: 500;
	font-family: 'Alibaba Medium';
	padding-left: 20px;
}

/* 邮箱输入组 */
.email-group {
	margin-bottom: 20px;
}

.email-input {
	height: 64px;
	background: #272935;
	border-radius: 16px 16px 16px 16px;
	color: #FFFFFF;
	font-size: 20px;
	font-weight: 500;
	font-family: 'Alibaba Medium';
	padding-left: 20px;
}


/* 密码输入框 */
.password-input {
	height: 64px;
	background: #272935;
	border-radius: 16px 16px 16px 16px;
	padding: 0 24px;
	color: #FFFFFF;
	margin-bottom: 22px;
	font-size: 20px;
}

.password-input::placeholder {
	color: #7D7E83;
}

/* 协议勾选行 - 小字灰色 */
.agreement-row {
	padding-left: 2px;
	color: #7D7E83;
	font-size: 14px;
	font-weight: 400;
	margin-bottom: 80px;
}

.agreement-row .checkbox {
	width: 33rpx;
	height: 33rpx;
	background-size: cover;
	background-image: url('/static/img/icon_unselecteds.webp');
	margin-right: 4px;
	display: inline-block;
	vertical-align: top;
}

.agreement-row .selected {
	background-image: url('/static/img/icon_selecteds.webp');
}



/* 登录按钮 - 渐变色背景+深色字体 */
.login-btn {
	height: 64px;
	line-height: 64px;
	background: linear-gradient(90deg, #38FFA7 0%, #45F6FF 100%);
	border-radius: 16px 16px 16px 16px;
	color: #1C1F2A;
	font-size: 22px;
	font-weight: bold;
	font-family: 'Alibaba Medium';
	text-align: center;
	margin-bottom: 24px;
}

/* 辅助链接行 */
.link-row {
	height: 22px;
	font-weight: 400;
	font-size: 16px;
	color: #7D7E83;
	display: flex;
	justify-content: center;
	gap: 8px;
	margin-bottom: 100px;
}


/* 邮箱登录链接 - 补充蓝文字色值 */
.login-type-link {
	display: block;
	text-align: center;
	font-size: 16px;
	color: #42E3E7;
	font-weight: 500;
}

/* 输入框placeholder样式 */
.phone-input::placeholder,
.email-input::placeholder,
.password-input::placeholder {
	color: #7D7E83;
}
</style>