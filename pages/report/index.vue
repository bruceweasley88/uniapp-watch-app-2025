<template>
	<view class="page">

		<view class="top">
			<view class="title">Report list</view>
			<view class="sub-title">Track test results and analyze data</view>
		</view>

		<view class="list">

			<view class="item item-bg-ecg">
				<view class="title">Electrocardiogram</view>
				<view class="sub-title">Record physical changes</view>
				<view class="button" style="color: #6E67E2;">Record</view>
			</view>

			<view class="item item-bg-heartrate">
				<view class="title">Heart rate</view>
				<view class="sub-title">Focus on heart health</view>
				<view class="button" style="color: #EE7A95;">Record</view>
			</view>

			<view class="item item-bg-bloodoxygen">
				<view class="title">Blood oxygen</view>
				<view class="sub-title">Detection and protection</view>
				<view class="button" style="color: #FF7E3F;">Detect</view>
			</view>

			<view class="item item-bg-bloodpressure">
				<view class="title">Blood pressure</view>
				<view class="sub-title">Measure blood pressure</view>
				<view class="button" style="color: #449AF6;">Detect</view>
			</view>

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

	},
	methods: {

	}
}
</script>
<style lang="scss" scoped>
.page {
	width: 100vw;
	height: 100%;
	background-color: #111217;
	background-image: url('/static/img/bg_top.webp');
	background-position: top;
	background-repeat: no-repeat;
	padding-bottom: 150px;
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