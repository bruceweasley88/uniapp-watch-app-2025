<template>
	<view class="page">
		<nav-bar :title="$t('upgrade.title')" />

		<view class="body">
			<image class="image" src="/static/img/img_noupdate.webp" />
			<view class="text">{{ $t('upgrade.latestVersion') }}</view>
			<view class="version">{{ $t('upgrade.versionPrefix') }}{{ version }}</view>

			<view class="update-log" v-if="data?.explain?.length">
				<view class="log-title">{{ $t('upgrade.updateLog') }}</view>
				<view class="log-item" v-for="item in sortedExplain" :key="item.id">
					<view class="log-dot"></view>
					<view class="log-content">{{ item.content }}</view>
				</view>
			</view>

			<view class="button click-active" @click="click">
				{{ data?.state == 1 ? $t('upgrade.upgradeNow') : $t('common.back') }}
			</view>
			<view v-if="data?.state != 1" class="back ">{{ $t('upgrade.noUpgrade') }}</view>
		</view>

	</view>
</template>

<script>
import { configGetAppVersion } from '../../apis/configApi';
import NavBar from '../../components/nav-bar.vue';

export default {
	components: {
		NavBar
	},
	data() {

		// 获取当前app的版本
		const systemInfo = uni.getSystemInfoSync();

		return {
			version: systemInfo.appVersion,
			data: null
		}
	},
	computed: {
		sortedExplain() {
			return this.data?.explain?.sort((a, b) => a.sort - b.sort) || []
		}
	},
	onLoad() {
		this.checkout();
	},
	onShow() {

	},
	methods: {
		async checkout() {
			const res = await configGetAppVersion({
				type: 1,
				terminal: 1,
				versionNum: uni.getSystemInfoSync().appVersionCode || '100'
			})
			this.data = res.data
		},
		async click() {
			if (this.data?.state == 1) {
				uni.showToast({ title: this.$t('upgrade.manualUpdate'), icon: 'success' })
			} else {
				uni.navigateBack();
			}
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
		margin-bottom: 50rpx;
	}

	.update-log {
		width: 600rpx;
		margin-bottom: 50rpx;
		border-radius: 16px;
		background-color: #ffffff10;
		padding: 28rpx;
	}

	.log-title {
		font-size: 29rpx;
		color: #FFFFFF;
		font-weight: 500;
		margin-bottom: 30rpx;
	}

	.log-item {
		display: flex;
		align-items: flex-start;
		margin-bottom: 20rpx;
	}

	.log-dot {
		width: 12rpx;
		height: 12rpx;
		border-radius: 50%;
		background: #38FFA7;
		margin-right: 16rpx;
		margin-top: 10rpx;
		flex-shrink: 0;
	}

	.log-content {
		flex: 1;
		font-size: 25rpx;
		color: #7D7E83;
		line-height: 36rpx;
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