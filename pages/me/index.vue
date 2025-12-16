<template>
	<view class="page">

		<!-- 用户信息 -->
		<view class="top">
			<view class="user-info click-active">
				<view class="user-head">
					<image src="/static/img/icon_photo.webp" mode="aspectFill" style="width: 100%; height: 100%;" />
				</view>
				<view class="user-name">Peppertones</view>
			</view>

			<view class="more click-active"></view>
		</view>

		<!-- 总分 -->
		<view class="points">
			<view class="total-points">
				<view class="title">
					<text class="title-text">Total Points</text>
					<text class="title-records click-active">Records</text>
				</view>
				<view class="body">
					<view class="number">3589</view>
					<view class="tips">Points can be withdrawn to wallet</view>
					<view class="withdraw click-active">Go to withdraw</view>
				</view>
			</view>
		</view>

		<!-- 钱包 -->
		<view class="wallet-block">
			<view class="wallet click-active">
				<view class="title">Wallet</view>
				<view class="body">
					<text class="unit">$</text>
					<text class="number">200.00</text>
					<text class="unit">HST</text>
					<view class="go"></view>
				</view>

			</view>
			<view class="address click-active">
				<view class="title">Wallet Address</view>
				<view class="go"></view>
			</view>
		</view>

		<!-- 设置 -->
		<view class="setting-title">Setting</view>
		<view class="setting">
			<view class="setting-body">
				<view class="item click-active" @click="toDevice">
					<text class="text icon_smartdevice">Smart device</text>
				</view>
				<view class="item click-active">
					<text class="text icon_appvesion">APP vesion</text>
				</view>
				<view class="item click-active">
					<text class="text icon_language">language</text>
				</view>
			</view>
		</view>

		<!-- 退出账号 -->
		<view class="logout">
			<view class="button click-active">logout</view>
		</view>

	</view>
</template>

<script>
export default {
	data() {
		return {

		}
	},
	onLoad() {
		plus.navigator.closeSplashscreen()
	},
	methods: {
		toDevice() {
			uni.navigateTo({
				url: '/pages/device/index'
			})
		}
	}
}
</script>
<style scoped>
.page {
	width: 100vw;
	height: 100%;
	background-color: #111217;
	background-image: url('/static/img/bg_top.webp');
	background-position: top;
	background-repeat: no-repeat;
	padding-bottom: 100px;
}

.top {
	padding: 0 20px;
	padding-top: 80px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 25px;

	.user-info {
		display: flex;
		align-items: center;


		.user-head {
			width: 70px;
			height: 70px;
			border-radius: 70px;
			background-color: #000;
			border: 2px solid #EAEAEA;
			overflow: hidden;


		}

		.user-name {
			font-size: 20px;
			color: #FFFFFF;
			font-weight: bold;
			font-family: 'Alibaba Medium';
			margin-left: 14px;
		}
	}

	.more {
		width: 18px;
		height: 18px;
		background-image: url('/static/img/icon_moreb.webp');
		background-size: cover;
	}


}

.points {
	padding: 0 20px;
	margin-bottom: 8px;

	.total-points {
		background-image: url('/static/img/bg_pointb.webp');
		background-size: cover;
		height: 110px;


		.title {
			padding: 0 20px;
			display: flex;
			justify-content: space-between;
			align-items: center;

			font-weight: 500;
			height: 36px;

			.title-text {
				font-weight: 500;
				font-size: 14px;
				color: #27BDC1;
				font-family: 'Alibaba Medium';
			}

			.title-records {
				color: #1C1F2A;
				font-size: 14px;
				font-weight: 500;
				font-family: 'Alibaba Medium';
			}

			.title-records::after {
				content: '';
				display: inline-block;
				width: 14px;
				height: 14px;
				background-image: url('/static/img/icon_more.webp');
				background-size: cover;
				margin-left: 6px;
				vertical-align: middle;
			}
		}


		.body {
			position: relative;
			padding: 0 20px;

			.number {
				height: 41px;
				font-family: 'Alibaba Medium';
				font-weight: bold;
				font-size: 30px;
				color: #1C1F2A;
			}

			.number::before {
				content: '';
				display: inline-block;
				margin-right: 2px;
				width: 24px;
				height: 24px;
				background-image: url('/static/img/icon_points.webp');
				background-size: cover;
				position: relative;
				top: 2px;
			}

			.tips {
				height: 16px;
				font-weight: 400;
				font-size: 12px;
				color: #60626A;
			}

			.withdraw {
				width: 110px;
				height: 32px;
				background: #1C1F2A;
				border-radius: 12px;


				font-family: 'Alibaba Medium';
				font-weight: 500;
				font-size: 12px;
				color: #FFFFFF;
				line-height: 32px;
				text-align: center;

				position: absolute;
				right: 20px;
				bottom: 0px;
			}

		}

	}
}

.wallet-block {
	padding: 0 20px;
	margin-bottom: 16px;
	display: flex;
	gap: 8px;

	.wallet,
	.address {
		height: 72px;
		background-size: 100% 100%;
	}


	.wallet {
		width: calc(100% - 124px);
		background-image: url('/static/img/bg_wallets.webp');

		.body {

			margin-left: 10px;

			.unit {
				font-family: 'Alibaba Medium';
				font-weight: bold;
				font-size: 14px;
				color: #1C1F2A;
			}

			.number {
				font-family: 'Alibaba Medium';
				font-weight: bold;
				font-size: 22px;
				color: #1C1F2A;
			}

			.go {
				vertical-align: middle;
				margin-bottom: 2px;
			}
		}

	}

	.address {
		width: 124px;
		background-image: url('/static/img/bg_walletadd.webp');

		.go {
			margin-top: 8px;
		}
	}

	.title {
		height: 19px;
		font-family: 'Alibaba Medium';
		font-weight: 500;
		font-size: 14px;
		color: #1C1F2A;
		margin-top: 12px;
		margin-left: 10px;

	}

	.go {
		width: 34px;
		height: 18px;
		background-image: url('/static/img/icon_go.webp');
		background-size: cover;
		margin-left: 10px;
		display: inline-block;
	}


}

.setting-title {
	height: 19px;
	font-family: 'Alibaba Medium';
	font-weight: 500;
	font-size: 14px;
	color: #FFFFFF;
	padding: 0 20px;
	margin-bottom: 12px;
}

.setting {
	padding: 0 20px;
	margin-bottom: 16px;

	.setting-body {
		background: #272935;
		border-radius: 16px;

		.item {

			padding: 20px;
			position: relative;

			.text::before {
				display: inline-block;
				content: '';
				width: 26px;
				height: 26px;
				background-size: cover;
				vertical-align: middle;
				margin-right: 12px;
			}

			.text {
				height: 24px;
				line-height: 24px;
				font-family: 'Alibaba Medium';
				font-weight: 400;
				font-size: 16px;
				color: #FFFFFF;
			}

			.icon_smartdevice::before {
				background-image: url('/static/img/icon_smartdevice.webp');
			}

			.icon_appvesion::before {
				background-image: url('/static/img/icon_appvesion.webp');
			}

			.icon_language::before {
				background-image: url('/static/img/icon_language.webp');
			}

		}

		.item::after {
			content: '';
			display: block;
			width: 18px;
			height: 18px;
			background-image: url('/static/img/icon_moreb.webp');
			background-size: cover;
			position: absolute;
			right: 20px;
			top: 24px
		}

	}
}

.logout {
	padding: 0 20px;

	.button {
		height: 58px;
		line-height: 58px;
		background: #272935;
		border-radius: 16px;
		text-align: center;
		color: #7D7E83;
		font-weight: 400;
		font-size: 16px;
	}
}
</style>