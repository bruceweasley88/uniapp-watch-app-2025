<template>
	<view class="page">
		<!-- 卡片容器 -->
		<view class="cotent-card">
			<!-- 标题区域 -->
			<text class="title">Sign up</text>
			<view class="subtitle">Please to register on account</view>

			<!-- 手机号输入组 -->
			<view class="phone-group" v-if="type === 'mobile'">
				<view class="country-code">+86</view>
				<input type="tel" class="phone-input" placeholder="Mobile number" />
			</view>

			<!-- 邮箱输入组 -->
			<view class="email-group" v-else>
				<input type="email" class="email-input" placeholder="Email address" />
			</view>

			<!-- 验证码 -->
			<view class="verification-group">
				<input type="text" placeholder="Verification code" />
				<view>sent code</view>
			</view>

			<!-- 密码输入框 -->
			<input type="password" class="password-input" placeholder="Password" />

			<!-- 协议勾选行 -->
			<view class="agreement-row">
				<view class="checkbox click-active"></view>
				<text>I have read the <text class="color-white">user agreement</text> and I accept it</text>
			</view>

			<!-- 按钮（渐变色背景） -->
			<button class="submit-btn click-active">Create new account</button>

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
export default {
	data() {
		return {
			type: 'mobile'  // 登录类型，默认为手机号登录，可选值：'phone'（手机号登录）、'email'（邮箱登录）
		}
	},
	onLoad() {

	},
	methods: {
		goToLogin() {
			uni.navigateBack();
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
	width: 280px;
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
	width: 18px;
	height: 18px;
	background: #FFFFFF;
	border-radius: 5px 5px 5px 5px;
	margin-right: 4px;
	display: inline-block;
	vertical-align: top;
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
</style>