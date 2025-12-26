<template>
	<view class="page">
		<nav-bar :title="getTitle()" />
		<view class="body">


			<view class="xd-chart">
				<xd-chart :is-running="start" />
			</view>

			<view class="content">{{ getContent() }}</view>
			<view class="tips">{{ $t('measurement.measuring') }}</view>

			<view class="circle">
				<circle-progress :max="60" :current="current">
					<view class="circle-bg">
						<text class="current">{{ current }}</text>
						<text class="countdown">{{ $t('common.countdown') }}</text>
						<text class="value">
							<text class="number">{{ currentData[getDataKey()] || '--' }}</text>
							<text class="unit">{{ getUnit() }}</text>
						</text>
					</view>
				</circle-progress>
			</view>

		</view>

		<view class="bottom">
			<view v-if="done" class="button click-active" @click="save">{{ $t('common.save') }}</view>
			<view v-else class="button click-active" @click="startOrStop">
				{{ start ? $t('common.stopDetection') : $t('common.startDetection') }}
			</view>

			<view class="tips">{{ $t('measurement.waitUpload') }}</view>
		</view>

	</view>
</template>

<script>
import { bloodOxygenAddRecord } from '../../apis/bloodOxygenApi';
import { bloodPressureAddRecord } from '../../apis/bloodPressureApi';
import { heartAddRecord } from '../../apis/heartApi';
import CircleProgress from '../../components/circle-progress.vue';
import NavBar from '../../components/nav-bar.vue';
import XdChart from '../../components/xd-chart.vue';
import { getAllConfig, startMeasure, stopMeasure } from '../../utils/watch';


export default {
	components: {
		NavBar,
		XdChart,
		CircleProgress
	},
	data() {
		return {
			start: false,
			type: '',
			unit: '',
			current: 60,
			timer: null,
			currentData: {},
			done: false
		}
	},
	onLoad(option) {
		this.type = option.type || 'heart_rate';
	},
	onShow() {

	},
	methods: {
		startOrStop() {

			this.start = !this.start;
			clearInterval(this.timer);
			this.current = 60;

			if (this.start) {
				this.timer = setInterval(() => {
					this.current = this.current - 1;
					if (this.current < 1) {
						this.startOrStop();
						this.done = true;
					}
				}, 1000)
				startMeasure(this.getKitType(), 50, 1)
				uni.$on("onRealTimeHealthMeasuringData", this.onData)
			} else {
				stopMeasure()
				uni.$off("onRealTimeHealthMeasuringData", this.onData)
			}

		},
		async save() {
			uni.showLoading({ title: this.$t('common.loading') });
			console.log('正在获取mac...')
			const config = getAllConfig();
			const macAddr = config['macAddr'];
			console.log('获取到当前mac:' + macAddr)

			try {
				console.log(this.type, '正在保存...')
				switch (this.type) {
					case 'heart_rate':
						await heartAddRecord({
							deviceSn: macAddr,
							heartRate: this.currentData['heartRate'], // 心率
						})
						break;
					case 'blood_oxygen':
						await bloodOxygenAddRecord({
							deviceSn: macAddr,
							heartRate: this.currentData['heartRate'], // 心率
							saturation: this.currentData['bloodOxygen'] // 饱和度（95%）传95
						})
						break;
					case 'blood_pressure':
						await bloodPressureAddRecord({
							deviceSn: macAddr,
							diastolicPressure: this.currentData['diastolic'], // 舒张压
							heartRate: this.currentData['heartRate'], // 心率
							systolicPressure: this.currentData['systolic'], // 收缩压
							temperature: this.currentData['temperatureFlag'], // 温度

							hourPeriod: "",
							irregularHeartbeat: "",
							movementError: "",
						})
						break;
				}
			} finally {
				console.log(this.type, '保存完成.')
				uni.hideLoading();
				uni.showToast({ title: this.$t('common.success'), icon: 'error' });
				setTimeout(() => {
					uni.navigateBack();
				}, 600)
			}

		},
		onData(data) {
			const _data = data?.list?.[0];
			if (_data) {
				this.currentData = { ..._data };
			}
		},
		getKitType() {
			switch (this.type) {
				case 'heart_rate': return 'heartrate';
				case 'blood_oxygen': return 'bloodoxygen';
				case 'blood_pressure': return 'bloodpressure';
				case 'ecg': return 'ecg';
			}
		},
		getDataKey() {
			switch (this.type) {
				case 'heart_rate': return 'heartRate';
				case 'blood_oxygen': return 'bloodOxygen';
				case 'blood_pressure': return 'systolic';
			}
		},
		getTitle() {
			switch (this.type) {
				case 'heart_rate': return this.$t('home.heartRate');
				case 'blood_oxygen': return this.$t('home.bloodOxygen');
				case 'blood_pressure': return this.$t('home.bloodPressure');
				default: return '';
			}
		},
		getContent() {
			switch (this.type) {
				case 'heart_rate': return this.$t('measurement.measuringHeartRate');
				case 'blood_oxygen': return this.$t('measurement.measuringBloodOxygen');
				case 'blood_pressure': return this.$t('measurement.measuringBloodPressure');
				default: return '';
			}
		},
		getUnit() {
			switch (this.type) {
				case 'heart_rate': return 'BPM';
				case 'blood_oxygen': return '%';
				case 'blood_pressure': return 'BPM';
			}
		}
	},
}
</script>

<style scoped>
.page {
	width: 100vw;
	min-height: 100vh;
	background-color: #111217;
	position: relative;
}

.body {
	padding-top: 52rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.xd-chart {
		width: 100%;
		height: 180rpx;
		/* 高度根据UI调整 */
	}

	.circle {
		width: 500rpx;
		height: 500rpx;
	}

	.content {
		font-weight: bold;
		font-size: 40rpx;
		font-family: 'Alibaba Medium';
		color: #FFFFFF;
		margin-top: 10rpx;
	}

	.tips {
		font-weight: 400;
		font-size: 29rpx;
		color: #7D7E83;
	}

	.circle-bg {
		background-image: url('/static/img/bg_countdown.webp');
		background-size: cover;
		width: 376rpx;
		height: 376rpx;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		display: flex;

		.current {
			font-family: 'Alibaba Medium';
			font-weight: bold;
			font-size: 73rpx;
			color: #FFFFFF;
		}

		.current::before {
			content: '';
			background-image: url('/static/img/icon_countdown.webp');
			background-size: cover;
			width: 1.71875rem;
			height: 1.71875rem;
			margin-right: 0.5625rem;
			vertical-align: middle;
			position: relative;
			display: inline-block;
		}

		.current::after {
			content: 's';
			font-family: 'Alibaba Medium';
			font-weight: bold;
			font-size: 51rpx;
			color: #FFFFFF;
			margin-left: 8rpx;
			vertical-align: bottom;
			position: relative;
			bottom: 4rpx;
		}

		.countdown {
			font-weight: 400;
			font-size: 29rpx;
			color: #60626A;
		}

		.value {
			.number {
				margin-right: 8rpx;
				color: #FFFFFF;
			}

			.unit {
				color: #60626A;
			}
		}
	}
}

.bottom {
	width: 100%;
	position: absolute;
	bottom: 80rpx;
	display: flex;
	flex-direction: column;
	align-items: center;

	.button {
		width: 663rpx;
		height: 117rpx;
		line-height: 117rpx;
		background: linear-gradient(90deg, #38FFA7 0%, #45F6FF 100%);
		border-radius: 29rpx;
		font-family: 'Alibaba Medium';
		font-weight: bold;
		font-size: 40rpx;
		color: #1C1F2A;
		text-align: center;
		margin-bottom: 26rpx;
	}

	.tips {
		width: 546rpx;
		height: 69rpx;
		font-weight: 400;
		font-size: 25rpx;
		color: #60626A;
		text-align: center;
	}
}
</style>