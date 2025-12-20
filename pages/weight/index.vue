<template>
	<view class="page">
		<nav-bar title="Weight" />
		<view class="body">

			<view class="report">
				<view class="item" v-for="item in reports">
					<view class="top">
						<view class="label">
							<image class="img" src="/static/img/icon_weight.webp" />
							<text class="text">{{ labelText }}</text>
						</view>
						<view class="value">
							<text class="number">{{ item.value }}</text>
							<text class="unit">{{ item.unit }}</text>
						</view>
					</view>
					<view class="bottom">
						<view class="label">
						</view>
						<view class="time">{{ item.time }}</view>
					</view>
				</view>
			</view>

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
		return {
			reports: [
				{ value: '84', unit: 'BPM', time: '2025-07-29 18:22', level: 0 },
				{ value: '108', unit: 'BPM', time: '2025-07-21 18:22', level: 1 },
			],
		}
	},
	onLoad(option) {
		this.type = option.type
	},
	onShow() {
		plus.navigator.closeSplashscreen();
	},
	methods: {
		toBack() {
			uni.navigateBack();
		},

	}
}
</script>
<style scoped lang="scss">
.page {
	width: 100vw;
	min-height: 100vh;
	background-color: #111217;
}


.body {
	display: flex;
	align-items: center;
	flex-direction: column;
	padding-top: 68rpx;
	width: 100%;


	.report {
		width: 692rpx;

		.item {
			background: #272935;
			border-radius: 18rpx;
			margin-bottom: 26rpx;

			.top {
				display: flex;
				justify-content: space-between;
				border-bottom: 2rpx dashed #1C1F2A;
				padding: 30rpx;
				align-items: baseline;

				.label {
					.img {
						height: 100rpx;
						width: 100rpx;
						margin-right: 22rpx;
					}

					.text {
						font-family: 'Alibaba Medium';
						font-weight: 500;
						font-size: 30rpx;
						color: #FFFFFF;
						position: relative;
						bottom: 18rpx;
					}
				}

				.value {
					.number {
						font-family: 'Alibaba Medium';
						font-weight: bold;
						font-size: 55rpx;
						color: #FFFFFF;
						vertical-align: bottom;
						margin-right: 8rpx;
					}

					.unit {
						font-family: 'Alibaba Medium';
						font-weight: 500;
						font-size: 25rpx;
						color: #7D7E83;
						vertical-align: bottom;
						position: relative;
						bottom: 8rpx;
					}

				}


			}

			.bottom {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 30rpx;

				.label {
					.color {
						width: 22rpx;
						height: 22rpx;
						border-radius: 22rpx;
						display: inline-block;
						margin-right: 10rpx;
						vertical-align: middle;
					}

					.text {
						font-weight: 400;
						font-size: 22rpx;
						color: #FFFFFF;
					}
				}

				.time {
					font-weight: 400;
					font-size: 22rpx;
					color: #FFFFFF;
					opacity: 0.6;
				}
			}
		}




	}

}
</style>