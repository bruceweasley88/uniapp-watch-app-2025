<template>
	<view class="page">
		<nav-bar title="Version upgrade" />

		<view class="body">
			<image class="image" src="/static/img/img_noupdate.webp" />
			<view class="text">This is the latest version</view>
			<view class="version">Danke V{{ version }}</view>
			<view class="button click-active" @click="toBindding">Upgrade now</view>
			<view class="back click-active-max" @click="toBack">No upgrade</view>
		</view>

	</view>
</template>

<script>
import NavBar from '../../components/nav-bar.vue';

export default {
	components: {
		NavBar
	},
	data() {

		// 获取当前app的版本
		const systemInfo = uni.getSystemInfoSync();

		return {
			version: systemInfo.appWgtVersion,
		}
	},
	onload() {

	},
	onShow() {
		plus.navigator.closeSplashscreen();
	},
	methods: {
		toBack() {
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
}


.body {
	display: flex;
	align-items: center;
	flex-direction: column;
	padding-top: 222rpx;

	.image {
		width: 309rpx;
		height: 309rpx;
		margin-bottom: 50rpx;
	}

	.text {
		text-align: center;
		color: #7D7E83;
		font-size: 29rpx;
		font-weight: 400;
		width: 411rpx;
		margin-bottom: 6rpx;
	}

	.version {
		font-weight: 400;
		font-size: 25rpx;
		color: #60626A;
		text-align: center;
		margin-bottom: 70rpx;
	}

	.button {
		color: #1C1F2A;
		font-size: 22px;
		font-weight: bold;
		height: 117rpx;
		line-height: 117rpx;
		width: 663rpx;

		border-radius: 16px;
		background: linear-gradient(90deg, #38FFA7 0%, #45F6FF 100%);
		text-align: center;

		font-family: 'Alibaba Medium';

		margin-bottom: 30rpx;
	}

	.back {
		font-weight: 400;
		font-size: 25rpx;
		color: #60626A;
		text-align: center;
	}
}
</style>