<template>
	<view class="page">

		<view class="top">
			<view class="title">{{ $t('report.title') }}</view>
			<view class="sub-title">{{ $t('report.subtitle') }}</view>
		</view>

		<view class="list">

			<view class="item item-bg-heartrate">
				<view class="title">{{ $t('report.heartRate') }}</view>
				<view class="sub-title">{{ $t('report.heartRateDesc') }}</view>
				<view class="button" style="color: #EE7A95;" @click="toResults('heart_rate')">{{ $t('report.record') }}</view>
				<view class="right">
					<view v-if="!heartData" class="empty">{{ $t('report.noData') }}</view>
					<view v-else class="value">
						<view class="number">{{ heartData.heartRate }}<text class="unit">BPM</text></view>
						<view class="time">{{ new Date(heartData.createTime).toLocaleTimeString() }}</view>
					</view>
				</view>
			</view>

			<view class="item item-bg-bloodoxygen">
				<view class="title">{{ $t('report.bloodOxygen') }}</view>
				<view class="sub-title">{{ $t('report.bloodOxygenDesc') }}</view>
				<view class="button" style="color: #FF7E3F;" @click="toResults('blood_oxygen')">{{ $t('report.record') }}</view>
				<view class="right">
					<view v-if="!oxygenData" class="empty">{{ $t('report.noData') }}</view>
					<view v-else class="value">
						<view class="number">{{ oxygenData.saturation }}<text class="unit">%</text></view>
						<view class="time">{{ new Date(oxygenData.createTime).toLocaleTimeString() }}</view>
					</view>
				</view>
			</view>

			<view class="item item-bg-bloodpressure">
				<view class="title">{{ $t('report.bloodPressure') }}</view>
				<view class="sub-title">{{ $t('report.bloodPressureDesc') }}</view>
				<view class="button" style="color: #449AF6;" @click="toResults('blood_pressure')">{{ $t('report.record') }}</view>
				<view class="right">
					<view v-if="!pressureData" class="empty">{{ $t('report.noData') }}</view>
					<view v-else class="value">
						<view class="number">{{ pressureData.systolicPressure }}/{{ pressureData.diastolicPressure }}<text
								class="unit">mmHg</text></view>
						<view class="time">{{ new Date(pressureData.createTime).toLocaleTimeString() }}</view>
					</view>
				</view>
			</view>

			<view class="item item-bg-ecg">
				<view class="title">{{ $t('report.ecg') }}</view>
				<view class="sub-title">{{ $t('report.ecgDesc') }}</view>
				<view class="button" style="color: #6E67E2;" @click="toResults('ecg')">{{ $t('report.record') }}</view>
				<view class="right">
					<view class="empty">{{ $t('report.noData') }}</view>
				</view>
			</view>

			<!-- <view class="item item-bg-weigth">
				<view class="title">Blood pressure</view>
				<view class="sub-title">Measure blood pressure</view>
				<view class="button" style="color: #449AF6;" @click="toWeigth">Record</view>
			</view> -->

		</view>
	</view>
</template>

<script>
import { bloodOxygenGetRecordList } from '../../apis/bloodOxygenApi';
import { bloodPressureGetRecordList } from '../../apis/bloodPressureApi';
import { heartGetRecordList } from '../../apis/heartApi';

export default {
	data() {
		return {
			heartData: null,
			oxygenData: null,
			pressureData: null,
		}
	},
	onLoad() {
		this.updateHeartData();
		this.updateOxygenData();
		this.updatePressureData();
	},
	onShow() {

	},
	methods: {
		toResults(type) {
			if (type === 'ecg') {
				return uni.showToast({ title: this.$t('common.notSupported'), icon: 'error' });
			}

			uni.navigateTo({
				url: '/pages/results/index?type=' + type,
			})
		},
		toWeigth() {
			uni.navigateTo({
				url: '/pages/weigth/index',
			})
		},
		async updateHeartData() {
			const res = await heartGetRecordList({ limit: 1, page: 1 });
			this.heartData = res.data.list?.[0] || null;
			console.log(1, this.heartData)
		},
		async updateOxygenData() {
			const res = await bloodOxygenGetRecordList({ limit: 1, page: 1 });
			this.oxygenData = res.data.list?.[0] || null;
			console.log(2, this.oxygenData)
		},
		async updatePressureData() {
			const res = await bloodPressureGetRecordList({ limit: 1, page: 1 });
			this.pressureData = res.data.list?.[0] || null;
			console.log(3, this.pressureData)
			// "hourPeriod": 3,
			// "systolicPressure": 67,
			// "diastolicPressure": 103,
			// "heartRate": "52",
		}
	}
}
</script>
<style lang="scss" scoped>
.page {
	width: 100vw;
	min-height: 100%;
	background-color: #111217;
	background-image: url('/static/img/bg_top.webp');
	background-position: top;
	background-repeat: no-repeat;

}

.list {
	padding: 0 20px;


	.item {
		height: 130px;
		border-radius: 16px 16px 16px 16px;
		margin-bottom: 20px;
		position: relative;
		background-size: cover;
		padding-top: 14px;


		.title {
			height: 25px;
			font-family: 'Alibaba medium';
			font-weight: bold;
			font-size: 18px;
			color: #FFFFFF;
			margin-bottom: 2px;
			margin-left: 14px;
		}

		.sub-title {
			height: 19px;
			font-weight: 400;
			font-size: 14px;
			color: #FFFFFF;
			margin-left: 14px;
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

		.right {
			width: 30%;
			right: 28rpx;
			bottom: 28rpx;
			display: flex;
			position: absolute;
			justify-content: right;

			.empty {
				color: rgba(255, 255, 255, 0.6);
				font-size: 22rpx;
				font-weight: 400;
			}

			.value {
				text-align: right;

				.number {
					color: #FFFFFF;
					font-size: 55rpx;
					font-weight: bold;
					font-family: 'Alibaba medium';

					.unit {
						color: rgba(255, 255, 255, 0.6);
						font-weight: 500;
						font-size: 25rpx;
						margin-left: 8rpx;
					}
				}

				.time {
					color: rgba(255, 255, 255, 0.6);
					font-size: 22rpx;
					font-weight: 400;
				}
			}
		}

	}

	.item-bg-ecg {
		background-image: url('/static/img/bg_ecgb.webp');
	}

	.item-bg-bloodoxygen {
		background-image: url('/static/img/bg_bloodoxygenl.webp');
	}

	.item-bg-heartrate {
		background-image: url('/static/img/bg_heartratel.webp');
	}

	.item-bg-bloodpressure {
		background-image: url('/static/img/bg_bloodpressurel.webp');
	}

	.item-bg-weigth {
		background-image: url('/static/img/icon_weight.webp');
	}
}


.top {
	padding: 0 20px;
	padding-top: 80px;

	.title {
		height: 38px;
		font-family: 'Alibaba Medium';
		font-weight: 800;
		font-size: 28px;
		color: #FFFFFF;
		margin-bottom: 2px;
	}

	.sub-title {
		height: 22px;
		font-weight: 400;
		font-size: 16px;
		color: #60626A;
		margin-bottom: 12px;
	}
}
</style>