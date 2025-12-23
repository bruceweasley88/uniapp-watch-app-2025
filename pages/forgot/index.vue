<template>
	<view class="page">
		<!-- 卡片容器 -->
		<view class="cotent-card">
			<!-- 标题区域 -->
			<text class="title">Forgot password</text>
			<view class="subtitle">Please change your password</view>

			<!-- 手机号输入组 -->
			<view class="phone-group" v-if="type === 'mobile'">
				<view class="country-code click-active">+86</view>
				<input
					type="tel"
					class="phone-input"
					placeholder="Mobile number"
					v-model="phone"
					maxlength="11"
				/>
			</view>

			<!-- 邮箱输入组 -->
			<view class="email-group" v-else>
				<input
					type="email"
					class="email-input"
					placeholder="Email address"
					v-model="email"
				/>
			</view>

			<!-- 验证码 -->
			<view class="verification-group">
				<input
					type="text"
					placeholder="Verification code"
					v-model="code"
					maxlength="6"
				/>
				<view
					class="click-active"
					@click="sendCode"
					:class="{ disabled: countdown > 0 }"
				>
					{{ countdown > 0 ? `${countdown}s` : 'sent code' }}
				</view>
			</view>

			<!-- 密码输入框 -->
			<input
				type="password"
				class="password-input"
				placeholder="New password"
				v-model="password"
			/>

			<!-- 协议勾选行 -->
			<view class="agreement-row">
				<view :class="`checkbox click-active ${accept ? 'selected' : ''}`" @click="accept = !accept"></view>
				<text @click="accept = !accept">I have read the <text class="color-white">user agreement</text> and I accept it</text>
			</view>

			<!-- 按钮（渐变色背景） -->
			<button class="submit-btn click-active" @click="reset">Reset</button>

			<!-- 辅助链接区域 -->
			<view class="link-row">
				<text class="color-white click-active" @click="type = type === 'mobile' ? 'email' : 'mobile'">
					Register with {{ type === 'mobile' ? 'Email' : 'Mobile' }}
				</text>
				<text>|</text>
				<text class="click-active" @click="goToLogin">Log in</text>
			</view>

		</view>
	</view>
</template>

<script>
import { updatePsd, updatePsdByEmailCode } from '@/apis/userApi.js'
import { commonSendSmsCode, commonSendEmailCode } from '@/apis/commonApi.js'

export default {
	data() {
		return {
			type: 'mobile',  // 重置类型：'mobile' 或 'email'
			accept: true,   // 是否同意用户协议

			// 表单数据
			phone: '',       // 手机号
			email: '',       // 邮箱
			code: '',        // 验证码
			password: '',    // 新密码

			// 验证码倒计时
			countdown: 0,    // 倒计时秒数
			countdownTimer: null,  // 定时器
		}
	},
	onLoad() {

	},
	onUnload() {
		if (this.countdownTimer) {
			clearInterval(this.countdownTimer)
		}
	},
	methods: {
		goToLogin() {
			uni.navigateBack();
		},

		// 发送验证码
		async sendCode() {
			// 校验倒计时
			if (this.countdown > 0) return

			try {
				// 验证输入
				if (this.type === 'mobile' && !this.phone) {
					uni.showToast({ title: 'Please enter phone number', icon: 'none' })
					return
				}
				if (this.type === 'email' && !this.email) {
					uni.showToast({ title: 'Please enter email address', icon: 'none' })
					return
				}

				// 调用API - 使用type='2'找回密码类型
				if (this.type === 'mobile') {
					await commonSendSmsCode({
						phone: this.phone,
						areaCode: '86',
						type: '2'
					})
				} else {
					await commonSendEmailCode({
						email: this.email,
						type: '2'
					})
				}

				uni.showToast({ title: 'Verification code sent', icon: 'success' })

				// 开始倒计时
				this.startCountdown()

			} catch (error) {
				uni.showToast({ title: error.message || 'Send failed', icon: 'none' })
			}
		},

		// 开始倒计时
		startCountdown() {
			this.countdown = 60
			this.countdownTimer = setInterval(() => {
				this.countdown--
				if (this.countdown <= 0) {
					clearInterval(this.countdownTimer)
					this.countdownTimer = null
				}
			}, 1000)
		},

		// 验证表单
		validateForm() {
			// 验证手机号或邮箱
			if (this.type === 'mobile') {
				if (!this.phone) {
					uni.showToast({ title: 'Please enter phone number', icon: 'none' })
					return false
				}
				if (!/^1[3-9]\d{9}$/.test(this.phone)) {
					uni.showToast({ title: 'Please enter valid phone number', icon: 'none' })
					return false
				}
			} else {
				if (!this.email) {
					uni.showToast({ title: 'Please enter email address', icon: 'none' })
					return false
				}
				if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
					uni.showToast({ title: 'Please enter valid email address', icon: 'none' })
					return false
				}
			}

			// 验证验证码
			if (!this.code) {
				uni.showToast({ title: 'Please enter verification code', icon: 'none' })
				return false
			}

			// 验证新密码
			if (!this.password) {
				uni.showToast({ title: 'Please enter new password', icon: 'none' })
				return false
			}
			if (this.password.length < 6) {
				uni.showToast({ title: 'Password must be at least 6 characters', icon: 'none' })
				return false
			}

			// 验证协议
			if (!this.accept) {
				uni.showToast({ title: 'Please accept user agreement', icon: 'none' })
				return false
			}

			return true
		},

		// 重置密码
		async reset() {
			if (!this.validateForm()) return

			try {

				if (this.type === 'mobile') {
					console.log({
						phone: this.phone,
						verifyCode: this.code,
						newPassword: this.password
					})

					// 手机号重置密码
					await updatePsd({
						phone: this.phone,
						verifyCode: this.code,
						newPassWord: this.password
					})
				} else {
					// 邮箱重置密码
					await updatePsdByEmailCode({
						email: this.email,
						verifyCode: this.code,
						newPassWord: this.password
					})
				}

				uni.hideLoading()
				uni.showToast({ title: 'successful', icon: 'success' })

				// 延迟跳转到登录页
				setTimeout(() => {
					this.goToLogin()
				}, 1500)

			} catch (error) {
				uni.hideLoading()
				uni.showToast({ title: error.message || 'Reset failed', icon: 'none' })
			}
		}
	}
}
</script>

<style scoped>
.page {
	width: 100vw;
	height: 100vh;
	background-color: #111217;
	background-image: url('/static/img/bg_top.webp');
	background-position: top;
	background-repeat: no-repeat;
}

.cotent-card {
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


.verification-group {
	height: 64px;
	background: #272935;
	border-radius: 16px 16px 16px 16px;
	color: #FFFFFF;
	font-size: 20px;
	font-weight: 500;
	font-family: 'Alibaba Medium';
	padding-left: 20px;
	margin-bottom: 20px;
	display: flex;
	justify-items: center;
	align-items: center;
}

.verification-group input {
	color: #FFFFFF;
	font-size: 20px;
	font-weight: 500;
}

.verification-group view {
	width: 460rpx;
	font-weight: 500;
	font-size: 18px;
	color: #FFFFFF;
	font-family: 'Alibaba Medium';
}

.verification-group view::before {
	content: '|';
	margin: 0 18px;
	font-size: 14px;
	color: #7D7E83;
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
	padding-left: 14px;
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
.submit-btn {
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

/* 验证码按钮禁用状态 */
.verification-group .disabled {
	color: #7D7E83;
	cursor: not-allowed;
}

/* 输入框placeholder样式 */
.phone-input::placeholder,
.email-input::placeholder,
.verification-group input::placeholder,
.password-input::placeholder {
	color: #7D7E83;
}

/* 协议勾选行样式调整 */
.agreement-row {
	padding-left: 2px;
}
</style>