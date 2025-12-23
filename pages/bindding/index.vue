<template>
	<view class="page">
		<nav-bar title="Binding Device" />
		<view class="search" v-if="currentStatus === 'search'">
			<view class="title">Make sure Bluetooth is turned on</view>
			<image class="image" src="/static/img/img_diffusion.webp" />
			<view class="tip">Searching for devices...<!-- Can't find my device? --></view>


			<view class="device-list" v-if="showDevices">
				<!-- 标题 -->
				<view class="device-list-title">选择设备</view>

				<!-- 设备列表 -->
				<view class="device-list-content">
					<view v-for="(deviceName, deviceId) in devices" :key="deviceId" class="device-item"
						@click.stop="clickConnectAndBindding(deviceId)">
						<view class="device-name click-active">{{ deviceName }}</view>
						<view class="device-icon click-active"></view>
					</view>
				</view>
			</view>

		</view>

		<view class="binding" v-if="currentStatus === 'bindding'">
			<view class="title">Keep your smartwatch screen lit during binding</view>
			<image class="image" src="/static/img/img_watchb.webp" />
			<view class="circle">
				<circle-progress :max="60" :current="binddingTime"></circle-progress>
			</view>
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
import CircleProgress from '../../components/circle-progress.vue';
// #ifdef APP-PLUS
import { bind, connect, currentBindUser, currentConnect, startScan, stopScan } from '../../utils/watch';
// #endif
export default {
	components: {
		NavBar,
		AlertPopup,
		CircleProgress
	},
	data() {
		return {
			currentStatus: '',
			devices: {},
			showDevices: false,
			binddingTime: 1
		}
	},
	onLoad() {

	},
	onShow() {
		this.init()
		// this.currentStatus = 'bindding';
	},
	onUnload() {
		stopScan();
	},
	methods: {
		init() {
			this.currentStatus = 'search';
			if (currentConnect) {
				this.currentStatus = 'bindding';
				if (currentBindUser) {
					this.currentStatus = 'success';
				}
			}
			this.run();
		},
		async run() {
			switch (this.currentStatus) {
				case 'search':
					await this.startScan();
					break;
				case 'bindding':
					await this.startBinding();
					break;
				case 'success':
			}
		},
		async startScan() {
			await this.scan();
			this.showDevices = true;
		},
		async startBinding(before) {
			this.currentStatus = 'bindding';

			const timer = setInterval(() => {
				if (this.binddingTime < 50) {
					this.binddingTime = this.binddingTime + 1;
				} else {
					clearInterval(timer);
				}
			}, 500);

			await before?.();
			await this.bind();
			clearInterval(timer);
			this.binddingTime = 60;
			setTimeout(() => {
				this.currentStatus = 'success';
			}, 500)
		},
		async clickConnectAndBindding(deviceId) {
			await this.startBinding(() => this.connect(deviceId));
		},
		scan() {
			return new Promise(resolve => {
				startScan()
				const handleDeviceDiscovered = (data) => {
					this.devices = {
						...this.devices,
						[data.deviceId]: data.deviceName
					};
				}
				uni.$on('onPeripheralDiscovered', handleDeviceDiscovered);
				setTimeout(() => {
					// 停止
					stopScan();
					uni.$off('onPeripheralDiscovered', handleDeviceDiscovered);
					resolve()
				}, 3000)
			})
		},
		connect(deviceId) {
			console.log('开始连接...')
			if (currentConnect) {
				console.log('已连接...')
				return Promise.resolve(true);
			}
			return new Promise(resolve => {
				console.log('连接' + deviceId)
				connect(deviceId);
				uni.$once('onPeripheralConnectedNotification', () => {
					console.log('连接' + deviceId + '成功')
					setTimeout(() => resolve(true), 800)
				});
				uni.$once('onPeripherialConnectFailureNotification', () => {
					console.log('连接' + deviceId + '失败')
					resolve(false)
				});
			})
		},
		bind() {
			console.log('开始绑定...')
			if (currentBindUser) {
				console.log('已绑定...')
				return Promise.resolve(true);
			}
			return new Promise(resolve => {
				console.log('绑定1000')
				bind("1000");
				uni.$once('onBindUserObject', (data) => {
					console.log('绑定1000结果', data)
					resolve(data.succeed)
				})
			})

		},
		handleStartDetection() {
			uni.redirectTo({
				url: '/pages/measurement/index?type=heart_rate'
			});
		},
		toHome() {
			uni.switchTab({
				url: '/pages/home/index'
			});
		},
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
	}

	.circle {
		width: 380rpx;
		height: 380rpx;
		margin-top: -560rpx;
		margin-right: 16rpx;
		padding-bottom: 230rpx;
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

.device-list {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 999;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.device-list-title {
	margin-top: 180rpx;
	background: #FFFFFF;
	border-radius: 24px 24px 0 0;
	width: 600rpx;
	font-size: 36rpx;
	font-weight: bold;
	color: #1C1F2A;
	text-align: center;
	padding-top: 30rpx;
	padding-bottom: 10rpx;
	font-family: 'Alibaba Medium';
	border-bottom: 1px solid #eee;
}

.device-list-content {
	background: #FFFFFF;
	border-radius: 0 0 24px 24px;
	width: 600rpx;
	max-height: 400rpx;
	overflow-y: auto;
}

.device-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 30rpx;
	border-bottom: 1px solid #EAEAEA;
}

.device-item:last-child {
	border-bottom: none;
}

.device-name {
	font-size: 33rpx;
	color: #1C1F2A;
	font-family: 'Alibaba Medium';
}

.device-icon {
	font-size: 33rpx;
	color: #7D7E83;
	width: 30rpx;
	height: 30rpx;
	background-size: cover;
	background-image: url('/static/img/icon_moreb.webp');
}

.device-list-content::-webkit-scrollbar {
	width: 0;
}
</style>