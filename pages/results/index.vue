<template>
	<view class="page">
		<nav-bar :title="title" />
		<view class="body">

			<!-- 顶部 -->
			<view class="description-title">{{ $t(descriptionKey) }}</view>
			<view class="level-description">
				<view class="level-bar">
					<view class="level" v-for="level in levels">
						<view class="title">{{ level.title }}</view>
						<view class="bar" :style="`background-color: ${level.color};`" />
						<view class="sub-title" v-if="level.subTitle">{{ level.subTitle }}</view>
					</view>
				</view>

				<view :class="`level-label ${levels.length > 3 ? 'level-label-more' : ''}`">
					<view class="level" v-for="level in levels">
						<text class="color" :style="`background-color: ${level.color};`" />
						<text class="label">{{ level.label }}</text>
					</view>
				</view>

				<div class="level-tips" v-html="tips"></div>

			</view>


			<!-- 报告 -->
			<view class="report-title">{{ $t('results.reportUpdate') }}</view>
			<view class="report">
				<view class="item" v-for="item in reports">
					<view class="top">
						<view class="label">
							<image class="img" :src="imgSrc" />
							<text v-if="type !== 'blood_pressure'" class="text">{{ labelText }}</text>
							<text v-else class="text text2">{{ labelText }}</text>
						</view>
						<view class="value">
							<text class="number">{{ item.value }}</text>
							<text class="unit">{{ item.unit }}</text>
						</view>
					</view>
					<view class="bottom">
						<view class="label">
							<view class="color" :style="`background-color: ${getLevel(item.level).color};`"></view>
							<text class="text">{{ getLevel(item.level).label }}</text>
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
import { heartGetRecordList } from '../../apis/heartApi';
import { bloodOxygenGetRecordList } from '../../apis/bloodOxygenApi';

export default {
	components: {
		NavBar
	},
	data() {
		return {

			type: '',
			title: '',
			descriptionKey: '',
			levels: [],
			currentLevel: 0,
			tips: '',

			reports: [],
			imgSrc: '',
			labelText: '',


		}
	},
	onLoad(option) {
		this.type = option.type
	},
	onShow() {
		this.updateData()
	},
	methods: {
		toBack() {
			uni.navigateBack();
		},
		async updateData() {
			const type = this.type;
			if (type === 'heart_rate') {
				this.title = this.$t('results.heartRate.title');
				this.descriptionKey = 'results.heartRate.description';
				this.levels = [
					{ color: '#42E3E7', title: '<60', subTitle: '', label: this.$t('results.heartRate.level1') },
					{ color: '#94E054', title: '60-10', subTitle: '', label: this.$t('results.heartRate.level2') },
					{ color: '#FF8040', title: '>100', subTitle: '', label: this.$t('results.heartRate.level3') },
				]
				this.tips = this.$t('results.heartRate.tips');

				const heartRes = await heartGetRecordList({ limit: 50, page: 1 });
				this.reports = heartRes.data.list.map(item => ({
					value: item.heartRate,
					unit: 'BPM',
					time: new Date(item.createTime).toLocaleString(),
					level: this.calculateHeartLevel(item.heartRate)
				}));
				this.imgSrc = '/static/img/icon_heartrate.webp';
				this.labelText = this.$t('results.heartRate.label');

			}

			if (type === 'blood_pressure') {
				this.title = this.$t('results.bloodPressure.title');
				this.descriptionKey = 'results.bloodPressure.description';
				this.levels = [
					{ color: '#42E3E7', title: '85<', subTitle: '<130', label: this.$t('results.bloodPressure.level1') },
					{ color: '#94E054', title: '85-89', subTitle: '130-139', label: this.$t('results.bloodPressure.level2') },
					{ color: '#FFE44A', title: '90-99', subTitle: '140-159', label: this.$t('results.bloodPressure.level3') },
					{ color: '#FF8040', title: '≥100', subTitle: '≥160', label: this.$t('results.bloodPressure.level4') },
				]
				this.tips = this.$t('results.bloodPressure.tips');

				this.reports = [
					{ value: '78/124', unit: 'mmHg', time: '2025-07-29 18:22', level: 0 },
					{ value: '88/135', unit: 'mmHg', time: '2025-07-21 18:22', level: 1 },
				]
				this.imgSrc = '/static/img/icon_bloodpressure.webp';
				this.labelText = this.$t('results.bloodPressure.label');
			}

			if (type === 'blood_oxygen') {
				this.title = this.$t('results.bloodOxygen.title');
				this.descriptionKey = 'results.bloodOxygen.description';
				this.levels = [
					{ color: '#42E3E7', title: '<94%', subTitle: '', label: this.$t('results.bloodOxygen.level1') },
					{ color: '#94E054', title: '95%-98%', subTitle: '', label: this.$t('results.bloodOxygen.level2') },
					{ color: '#FF8040', title: '>99%', subTitle: '', label: this.$t('results.bloodOxygen.level3') },
				]
				this.tips = this.$t('results.bloodOxygen.tips');

				const oxygenRes = await bloodOxygenGetRecordList({ limit: 50, page: 1 });
				this.reports = oxygenRes.data.list.map(item => ({
					value: Number(item.saturation).toFixed(0),
					unit: '%',
					time: new Date(item.createTime).toLocaleString(),
					level: this.calculateOxygenLevel(item.saturation)
				}));
				this.imgSrc = '/static/img/icon_bloodoxygen.webp';
				this.labelText = this.$t('results.bloodOxygen.label');
			}

		},
		getLevel(index) {
			return this.levels[index]
		},
		calculateHeartLevel(heartRate) {
			const hr = Number(heartRate);
			if (hr < 60) return 0;
			if (hr <= 100) return 1;
			return 2;
		},
		calculateOxygenLevel(saturation) {
			const sat = Number(saturation);
			if (sat < 94) return 0;
			if (sat <= 98) return 1;
			return 2;
		}


	}
}
</script>
<style scoped lang="scss">
.page {
	width: 100vw;
	background-color: #111217;
}


.body {
	display: flex;
	align-items: center;
	flex-direction: column;
	padding-top: 68rpx;
	width: 100%;

	.description-title {
		width: 692rpx;
		height: 35rpx;
		font-family: 'Alibaba Medium';
		font-weight: 500;
		font-size: 25rpx;
		color: #FFFFFF;
		margin-bottom: 18rpx;
		padding-left: 20rpx;
	}


	.level-description {
		width: 692rpx;
		background: #272935;
		border-radius: 18rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 36rpx 0;
		margin-bottom: 44rpx;


		.level-bar {
			display: flex;
			gap: 10rpx;
			width: 635rpx;

			.level {
				width: 100%;

				.title {
					font-weight: 400;
					font-size: 22rpx;
					color: #FFFFFF;
					text-align: center;
					opacity: 0.6;
					margin-bottom: 20rpx;
				}

				.bar {
					height: 18rpx;
					margin-bottom: 30rpx;
				}

				.sub-title {
					margin-top: -20rpx;
					font-weight: 400;
					font-size: 22rpx;
					color: #FFFFFF;
					text-align: center;
					opacity: 0.6;
					margin-bottom: 30rpx;
				}


				/* ✅ 修正：嵌套到.level-bar内，匹配正确层级 */
				&:first-child .bar {
					border-top-left-radius: 10rpx;
					/* 放大数值，先验证视觉效果 */
					border-bottom-left-radius: 10rpx;
				}

				&:last-of-type .bar {
					border-top-right-radius: 10rpx;
					/* 放大数值，先验证视觉效果 */
					border-bottom-right-radius: 10rpx;
				}

			}




		}

		.level-label {
			width: 635rpx;
			display: flex;
			justify-content: space-between;
			margin-bottom: 30rpx;
			flex-wrap: wrap;

			.level {
				display: flex;

				.color {
					width: 22rpx;
					height: 22rpx;
					border-radius: 22rpx;
					margin-right: 10rpx;
					display: inline-block;
					vertical-align: middle;
				}

				.label {
					font-weight: 400;
					font-size: 22rpx;
					height: 22rpx;
					color: #FFFFFF;
					display: inline-block;
				}
			}

		}

		.level-label-more {
			white-space: nowrap;

			.level {
				display: block;
				width: 49%;
			}
		}


		.level-tips {
			width: 635rpx;
			font-weight: 400;
			font-size: 25rpx;
			color: #7D7E83;
		}


	}


	.report-title {
		width: 692rpx;
		height: 49rpx;
		font-family: 'Alibaba Medium';
		font-weight: bold;
		font-size: 36rpx;
		color: #FFFFFF;
		padding-left: 20rpx;
		margin-bottom: 22rpx;
	}

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

					.text2 {
						display: block;
						white-space: nowrap;
						font-size: 24rpx;
						position: relative;
						top: 10rpx;
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