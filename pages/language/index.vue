<template>
	<view class="page">
		<nav-bar title="Language switching" />

		<view class="body" @touchmove.stop>
			<view class="title">Language</view>
			<view class="sub-title">Select your system language</view>

			<view class="list">
				<view class="item" v-for="item in list">
					<view class="text">
						<image class="icon" :src="item.icon" />
						<text :class="`name ${isSelected(item) ? 'name-selected' : ''}`">
							{{ item.name }}
						</text>
					</view>
					<view class="operate">
						<image class="selected_icon" v-if="isSelected(item)" src="/static/img/icon_selected.webp" />
					</view>
				</view>
			</view>


			<view class="action">
				<view class="cancel click-active-max" @click="toBack">cancel</view>
				<view class="m">|</view>
				<view class="ok click-active-max" @click="onOk">ok</view>
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
			current: 'English(General)',
			list: [
				{ "icon": "/static/lang/img_chinese.webp", "name": "中文" },
				{ "icon": "/static/lang/img_danish.webp", "name": "Dansk" },
				{ "icon": "/static/lang/img_en.webp", "name": "English(General)" },
				{ "icon": "/static/lang/img_fr.webp", "name": "Français" },
				{ "icon": "/static/lang/img_gerrman.webp", "name": "Deutsch" },
				{ "icon": "/static/lang/img_hk.webp", "name": "繁體中文(香港)" },
				{ "icon": "/static/lang/img_jp.webp", "name": "日本語" },
				{ "icon": "/static/lang/img_ko.webp", "name": "한국어" },
				{ "icon": "/static/lang/img_spanish.webp", "name": "Español" },
				{ "icon": "/static/lang/img_tw.webp", "name": "繁體中文(台灣)" },
				{ "icon": "/static/lang/img_us.webp", "name": "English(American)" }
			]

		}
	},
	onload() {

	},
	onShow() {
		plus.navigator.closeSplashscreen();
	},
	methods: {
		onOk() {
			this.toBack();
		},
		toBack() {
			uni.navigateBack();
		},
		isSelected(item) {
			return item.name === this.current
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