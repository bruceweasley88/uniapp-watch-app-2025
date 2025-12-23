<template>
	<view class="page">
		<nav-bar :title="getTitle()" />
		<view class="body">


			<view class="xd-chart">
				<xd-chart :is-running="start" />
			</view>

			<view class="content">{{ getContent() }}</view>
			<view class="tips">Measuring, Please wait...</view>

			<view class="circle">
				<circle-progress :max="60" :current="current">
					<view class="circle-bg">
						<text class="current">{{ current }}</text>
						<text class="countdown">Countdown</text>
						<text class="value">
							<text class="number">{{ currentData[getDataKey()] || '--' }}</text>
							<text class="unit">{{ getUnit() }}</text>
						</text>
					</view>
				</circle-progress>
			</view>

		</view>

		<view class="bottom">
			<view class="button click-active" @click="startOrStop">{{ start ? 'Stop Detection' : 'Start Detection' }}</view>
			<view class="tips">After the measurement is completed, wait for the watch to upload the data</view>
		</view>

	</view>
</template>

<script>
import CircleProgress from '../../components/circle-progress.vue';
import NavBar from '../../components/nav-bar.vue';
import XdChart from '../../components/xd-chart.vue';
import { startMeasure, stopMeasure } from '../../utils/watch';


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

			currentData: {}

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
				}, 1000)
				startMeasure(this.getKitType(), 50, 1)
				uni.$on("onRealTimeHealthMeasuringData", this.onData)
			} else {
				stopMeasure()
				ni.$off("onRealTimeHealthMeasuringData", this.onData)
			}

		},
		onData(data) {
			const _data = data?.list?.[0];
			if(_data) {
				this.currentData = {..._data};
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
				case 'heart_rate': return 'Heart rate';
				case 'blood_oxygen': return 'Blood oxygen';
				case 'blood_pressure': return 'Blood pressure';
			}
		},
		getContent() {
			switch (this.type) {
				case 'heart_rate': return 'Measuring Heart rate';
				case 'blood_oxygen': return 'Measuring Blood oxygen';
				case 'blood_pressure': return 'Measuring Blood pressure';
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