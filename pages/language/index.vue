<template>
	<view class="page">
		<nav-bar :title="$t('page.language')" />

		<view class="body" @touchmove.stop>
			<view class="title">{{ $t('language.title') }}</view>
			<view class="sub-title">{{ $t('language.subtitle') }}</view>

			<view class="list">
				<view class="item" v-for="item in list" @click="selectItem(item)">
					<view class="text">
						<image class="icon" :src="item.icon" />
						<text :class="`name ${isSelected(item) ? 'name-selected' : ''}`">
							{{ $t(item.key) }}
						</text>
					</view>
					<view class="operate">
						<image class="selected_icon" v-if="isSelected(item)" src="/static/img/icon_selected.webp" />
					</view>
				</view>
			</view>


			<view class="action">
				<view class="cancel click-active-max" @click="toBack">{{ $t('common.cancel') }}</view>
				<view class="m">|</view>
				<view class="ok click-active-max" @click="onOk">{{ $t('common.confirm') }}</view>
			</view>
		</view>

	</view>
</template>

<script>
import NavBar from '../../components/nav-bar.vue';
import { getLanguage, setLanguage } from '../../locale/index.js'

export default {
	components: {
		NavBar
	},
	data() {
		return {
			current: 'en',
			list: [
				{ "icon": "/static/lang/img_chinese.webp", "key": "language.chinese", "value": "zh" },
				{ "icon": "/static/lang/img_danish.webp", "key": "language.danish", "value": "da" },
				{ "icon": "/static/lang/img_en.webp", "key": "language.english", "value": "en" },
				{ "icon": "/static/lang/img_fr.webp", "key": "language.french", "value": "fr" },
				{ "icon": "/static/lang/img_gerrman.webp", "key": "language.german", "value": "de" },
				{ "icon": "/static/lang/img_hk.webp", "key": "language.zh-hk", "value": "zh-HK" },
				{ "icon": "/static/lang/img_jp.webp", "key": "language.japanese", "value": "ja" },
				{ "icon": "/static/lang/img_ko.webp", "key": "language.korean", "value": "ko" },
				{ "icon": "/static/lang/img_spanish.webp", "key": "language.spanish", "value": "es" },
				{ "icon": "/static/lang/img_tw.webp", "key": "language.zh-tw", "value": "zh-TW" },
				{ "icon": "/static/lang/img_us.webp", "key": "language.english-us", "value": "en-US" }
			]

		}
	},
	onLoad() {
		this.current = getLanguage()
	},
	onShow() {
		plus.navigator.closeSplashscreen();
	},
	methods: {
		onOk() {
			setLanguage(this.current)
			this.toBack();
		},
		toBack() {
			uni.navigateBack();
		},
		selectItem(item) {
			this.current = item.value
		},
		isSelected(item) {
			return item.value === this.current
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
	margin: 0 auto;
	margin-top: 280rpx;

	display: flex;
	align-items: center;
	flex-direction: column;

	width: 663rpx;
	background: #FFFFFF;
	border-radius: 29rpx;


	.title {
		font-family: 'Alibaba Medium';
		font-weight: bold;
		font-size: 40rpx;
		color: #1C1F2A;
		text-align: center;
		margin-bottom: 11rpx;
		margin-top: 44rpx;
	}

	.sub-title {
		font-weight: 400;
		font-size: 25rpx;
		color: #60626A;
		text-align: center;
		margin-bottom: 32rpx;
	}

	.list {
		height: 560rpx;
		overflow-y: auto;
		width: 100%;

		.item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 106rpx;
			border-bottom: 1px solid #EAEAEA;
			margin: 0 44rpx;

			.text {
				display: flex;
				align-items: center;

				.icon {
					width: 69.17rpx;
					height: 47.33rpx;
					margin-right: 26rpx;
				}

				.name {
					font-family: 'Alibaba Medium';
					font-weight: bold;
					font-size: 33rpx;
					color: #7D7E83;
				}

				.name-selected {
					color: #1C1F2A;
				}

			}

			.operate {
				.selected_icon {
					width: 44rpx;
					height: 44rpx;
				}
			}
		}

	}


	.action {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 130rpx;

		.cancel {
			width: 300rpx;
			font-weight: 400;
			font-size: 33rpx;
			color: #7D7E83;
			text-align: center;
		}

		.ok {
			width: 300rpx;
			font-family: 'Alibaba Medium';
			font-weight: bold;
			font-size: 33rpx;
			color: #27BDC1;
			text-align: center;
		}

		.m {
			color: #EAEAEA;
		}
	}
}
</style>