<template>
	<view class="page">
		<nav-bar title="Smate device" />

		<view class="empty" v-if="list.length === 0">
			<image class="image" src="/static/img/img_nodate.webp" />
			<view class="text">There is no paired device yet, go add it now</view>
			<view class="button click-active" @click="toBindding">Binding Device</view>
		</view>

		<view class="list" v-else>
			<view class="item" v-for="item in list">

				<view class="text">

					<image class="icon" v-if="item.connected" src="/static/img/icon_connect.webp" />
					<image class="icon" v-else src="/static/img/icon_noconnect.webp" />

					<view>
						<view class="name">{{ item.name }}</view>
						<view class="time">{{ item.time }}</view>
					</view>
				</view>

				<view class="status" v-if="item.connected">
					<image class="status_icon" src="/static/img/icon_red.webp" /> connerted
				</view>
				<view class="status" v-else>
					<image class="status_icon" src="/static/img/icon_green.webp" /> Not connected
				</view>

			</view>
		</view>


	</view>
</template>

<script>
import NavBar from '../../components/nav-bar.vue';
import { deviceGetListByUser } from '../../apis/deviceApi.js';

export default {
	components: {
		NavBar
	},
	data() {
		return {
			list: []
		}
	},
	onload() {

	},
	onShow() {
		plus.navigator.closeSplashscreen();
		this.loadDeviceList();
	},
	methods: {
		async loadDeviceList() {
			const res = await deviceGetListByUser();
			this.list = res.data || [];
		},
		toBindding() {
			uni.navigateTo({
				url: '/pages/bindding/index'
			});
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

.list {
	display: flex;
	align-items: center;
	flex-direction: column;

	.item {
		display: flex;
		align-items: center;
		justify-content: space-between;

		width: 692rpx;
		height: 166rpx;
		background: #272935;
		border-radius: 29rpx;

		margin-top: 26rpx;

		.text {
			display: flex;
			align-items: center;

			.icon {
				width: 70rpx;
				height: 100rpx;
				margin: 0 32rpx;
			}

			.name {
				font-family: 'Alibaba Medium';
				font-weight: 500;
				font-size: 33rpx;
				color: #FFFFFF;
				line-height: 46rpx;
			}

			.time {
				font-weight: 400;
				font-size: 22rpx;
				color: #7D7E83;
			}
		}

		.status {
			display: flex;
			align-items: center;
			font-size: 22rpx;
			font-weight: 400;
			color: #FFFFFF;
			margin-right: 32rpx;
			margin-top: 32rpx;

			.status_icon {
				width: 22rpx;
				height: 22rpx;
				margin-right: 5rpx;
			}
		}

	}

}


.empty {
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
	}
}
</style>