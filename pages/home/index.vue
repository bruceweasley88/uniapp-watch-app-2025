<template>
	<view class="page">

		<!-- 顶部 -->
		<view class="top" @click="toPresonal">
			<view class="hst">
				<view class="title">Mining progress</view>
				<view class="number">
					<text class="value">8888.00010</text>
					<text class="unit">HST</text>
				</view>
			</view>
			<view class="user-head">
				<image :src="getUserHeadImg()" mode="aspectFill" />
			</view>
		</view>


		<!-- 海报 -->
		<view class="poster">
			<swiper class="swiper" circular :indicator-dots="bannerList.length > 1" :autoplay="bannerList.length > 1"
				:interval="3000" :duration="500">
				<swiper-item v-for="(item, index) in bannerList" :key="index">
					<image :src="item.image" style="height: 100%; width: 100%;"></image>
				</swiper-item>
			</swiper>
		</view>


		<!-- 功能块 -->
		<view class="box">
			<view class="item item-bg-ecg click-active" @click="toMeasurement('ecg')">
				<view class="title">ECG</view>
				<view class="sub-title">Measure ECG</view>
				<view class="button" style="color: #6E67E2;">Detect</view>
			</view>

			<view class="item item-bg-heartrate click-active" @click="toMeasurement('heart_rate')">
				<view class="title">Heart rate</view>
				<view class="sub-title">Focus on heart health</view>
				<view class="button" style="color: #EE7A95;">Detect</view>
			</view>

		</view>

		<view class="box">
			<view class="item item-bg-bloodoxygen click-active" @click="toMeasurement('blood_oxygen')">
				<view class="title">Blood oxygen</view>
				<view class="sub-title">Detection and protection</view>
				<view class="button" style="color: #FF7E3F;">Detect</view>
			</view>

			<view class="item item-bg-bloodpressure click-active" @click="toMeasurement('blood_pressure')">
				<view class="title">Blood pressure</view>
				<view class="sub-title">Measure blood pressure</view>
				<view class="button" style="color: #449AF6;">Detect</view>
			</view>
		</view>


		<alert-popup v-model:visible="alertProfile" topImage="/static/img/icon_personal.webp"
			title="Please fill in your height and weight"
			content="The reference standard values ​​of the detection indicators need to be matched according to your information."
			buttonText="Confirm" @ok="toPresonal" />


	</view>
</template>

<script>
import AlertPopup from '@/components/alert-popup.vue'
import { commonGetIndexBanner } from '@/apis/commonApi.js'
import { deviceGetListByUser } from '@/apis/deviceApi.js'
import { currentBindUser, init } from '../../utils/watch';
import { userGetInfo } from '../../apis/userApi';

export default {
	components: {
		AlertPopup
	},
	data() {
		return {
			alertProfile: false,
			bannerList: [],
			// device: [],
			userInfo: null,
			initBluetoothDone: false,
		}
	},
	onLoad() {

	},
	onShow() {
		const token = uni.getStorageSync('token')
		console.log('token', token)
		if (token) {
			this.init();
			// #ifdef APP-PLUS
			setTimeout(() => plus.navigator.closeSplashscreen(), 200);
			// #endif
		} else {
			uni.redirectTo({
				url: '/pages/login/index',
				success: () => {
					// #ifdef APP-PLUS
					setTimeout(() => plus.navigator.closeSplashscreen(), 200);
					// #endif
				},
			})
		}
	},
	methods: {
		init() {
			this.getIndexBanner();
			this.initBluetooth();
			// this.getDeviceList();

			// #ifdef APP-PLUS
			setTimeout(() => plus.navigator.closeSplashscreen(), 200);
			// #endif
		},
		// 海报
		async getIndexBanner() {
			if (!this.bannerList.length) {
				const res = await commonGetIndexBanner();
				this.bannerList = res.data || [];
			}
		},
		initBluetooth() {
			// #ifdef APP-PLUS
			if (this.initBluetoothDone === false) {
				init();
				this.initBluetoothDone = true;
			}
			// #endif
		},
		async getDeviceList() {
			const res = await deviceGetListByUser();
			this.device = res.data || [];
		},
		async getUserInfo() {
			const userInfo = await userGetInfo();
			this.userInfo = userInfo.data;

			const info = userInfo.data;
			if (!info['weight'] || !info['height']) {
				this.alertProfile = true
			}


		},
		getUserHeadImg() {
			return this.userInfo?.headImg || '/static/img/icon_photo.webp'
		},
		toMeasurement(type) {
			if (currentBindUser) {
				uni.navigateTo({
					url: '/pages/measurement/index?type=' + type
				});
			} else {
				uni.navigateTo({
					url: '/pages/device/index'
				});
			}

		},
		toPresonal() {
			uni.navigateTo({
				url: '/pages/presonal/index'
			})
		},
		handleStartDetection() {

		},
		toTest() {
			uni.navigateTo({
				url: '/pages/test/index'
			});
		},
	}
}
</script>

<style lang="scss" scoped>
.page {
	width: 100vw;
	height: 100%;
	background-color: #111217;
	background-image: url('/static/img/bg_top.webp');
	background-position: top;
	background-repeat: no-repeat;
	padding-top: 80px;
	padding-bottom: 30px;
}

.top {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;
	margin-bottom: 28px;

	.hst {
		color: #FFFFFF;
		font-weight: bold;
		font-family: 'Alibaba Medium';

		.title {
			font-size: 14px;
			height: 19px;
			margin-bottom: 8px;
		}

		.number {

			.value {
				height: 28px;
				font-size: 24px;
				color: #42E3E7;
				line-height: 28px;
			}

			.unit {
				color: #42E3E7;
				font-size: 16px;
				height: 28px;
				line-height: 28px;
				margin-left: 4px;
			}

		}



	}

	.user-head {
		width: 70px;
		height: 70px;
		border-radius: 70px;
		background-color: #000;
		border: 2px solid #EAEAEA;
		overflow: hidden;

		image {
			width: 100%;
			height: 100%;
		}
	}

}

.poster {

	height: 150px;
	padding: 0 20px;
	margin-bottom: 20px;

	.swiper {
		width: 100%;
		height: 100%;
		border-radius: 16px;
		overflow: hidden;

		.swiper-item {
			width: 100%;
			height: 100%;
			border-radius: 16px;
			overflow: hidden;
		}

	}
}

.box {
	display: flex;
	gap: 20px;
	padding: 0 20px;
	margin-bottom: 20px;

	.item {
		color: #FFFFFF;
		height: 192px;
		flex: 1 1;
		border-radius: 16px;
		background-color: #42E3E7;
		background-size: cover;
		padding-left: 14px;
		position: relative;

		.title {
			height: 25px;
			font-family: 'Alibaba medium';
			font-weight: bold;
			font-size: 18px;
			color: #FFFFFF;
			margin-bottom: 2px;
			margin-top: 14px;
		}

		.sub-title {
			height: 19px;
			font-weight: 400;
			font-size: 14px;
			color: #FFFFFF;
		}

		.button {
			width: 68px;
			height: 28px;
			background: #FFFFFF;
			border-radius: 14px 14px 14px 14px;
			position: absolute;
			bottom: 14px;
			left: 14px;
			text-align: center;
			line-height: 28px;
			font-weight: 500;
			font-size: 14px;
			font-family: 'Alibaba Medium';
		}

	}

	.item-bg-ecg {
		background-image: url('/static/img/bg_ecg.webp');
	}

	.item-bg-bloodoxygen {
		background-image: url('/static/img/bg_bloodoxygen.webp');
	}

	.item-bg-heartrate {
		background-image: url('/static/img/bg_heartrate.webp');
	}

	.item-bg-bloodpressure {
		background-image: url('/static/img/bg_bloodpressure.webp');
	}

}


:deep(.uni-swiper-dot-active) {
	width: 20px;
	border-radius: 20px;
	background-color: #1C1F2A;
}
</style>