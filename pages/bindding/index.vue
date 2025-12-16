<template>
	<view class="page">
		<nav-bar title="Binding Device" />

		<view class="search" v-if="currentStatus === 'search'">
			<view class="title">Make sure Bluetooth is turned on</view>
			<image class="image" src="/static/img/img_diffusion.webp" />
			<view class="tip">Searching for devices...<!-- Can't find my device? --></view>
		</view>

		<view class="binding" v-if="currentStatus === 'binding'">
			<view class="title">Keep your smartwatch screen lit during binding</view>
			<image class="image" src="/static/img/img_watchb.webp" />
			<view class="tip">Binding is in progress...</view>
		</view>


		<alert-popup :visible="currentStatus === 'success'" topImage="/static/img/icon_personal.webp"
			title="Binding successful"
			content="Please make sure the watch is in contact with your skin and do not move it. Click the 'Start Detection' button to start the detection."
			buttonText="Start detection" @ok="handleStartDetection" />

	</view>
</template>

<script>
import NavBar from '../../components/nav-bar.vue';
import AlertPopup from '@/components/alert-popup.vue'

export default {
	components: {
		NavBar,
		AlertPopup
	},
	data() {
		return {
			currentStatus: 'success'
		}
	},
	onload() {

	},
	onShow() {
		plus.navigator.closeSplashscreen();
	},
	methods: {
		handleStartDetection() {

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

.search {
	display: flex;
	align-items: center;
	flex-direction: column;
	padding-top: 123rpx;


	.title {
		width: 581rpx;
		height: 49rpx;
		font-family: 'Alibaba Medium';
		font-weight: 500;
		font-size: 36rpx;
		color: #44F6FB;
		text-align: center;
		margin-bottom: 100rpx;
	}

	.image {
		width: 583rpx;
		height: 583rpx;
		margin-bottom: 150rpx;
		animation: breathe 3s linear infinite;
		transform-origin: center center;
	}

	.tip {
		height: 46rpx;
		font-weight: 400;
		font-size: 33rpx;
		color: #FFFFFF;
		text-align: center;
	}
}

.binding {
	display: flex;
	align-items: center;
	flex-direction: column;
	padding-top: 80rpx;

	.title {
		width: 581rpx;
		height: 49rpx;
		font-family: 'Alibaba Medium';
		font-weight: 500;
		font-size: 36rpx;
		color: #44F6FB;
		text-align: center;
		margin-bottom: 120rpx;
	}

	.image {
		width: 415.05rpx;
		height: 720rpx;
		margin-bottom: 130rpx;
	}

	.tip {
		height: 46rpx;
		font-weight: 400;
		font-size: 33rpx;
		color: #FFFFFF;
		text-align: center;
	}
}


/* 调整关键帧参数：放大1.2、缩小0.8，透明度0.6/1交替 */
@keyframes breathe {
	0% {
		transform: scale(1);
		/* 原始大小 */
		opacity: 1;
		/* 完全不透明 */
	}

	25% {
		transform: scale(1.2);
		/* 放大到1.2倍（你要求的大） */
		opacity: 0.6;
		/* 透明到0.6（你要求的透明） */
	}

	50% {
		transform: scale(1);
		/* 回到原始大小 */
		opacity: 1;
		/* 恢复不透明 */
	}

	75% {
		transform: scale(0.8);
		/* 缩小到0.8倍（你要求的小） */
		opacity: 0.6;
		/* 再次透明到0.6 */
	}

	100% {
		transform: scale(1);
		/* 回到原始大小 */
		opacity: 1;
		/* 恢复不透明 */
	}
}
</style>