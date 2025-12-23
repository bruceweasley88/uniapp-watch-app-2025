<template>
	<view class="page">

	</view>
</template>

<script>
export default {
	data() {
		return {

		}
	},
	onShow() {
		// uni.switchTab({
		// 	url: '/pages/home/index',
		// 	success: () => plus.navigator.closeSplashscreen(),
		// });

		
		uni.redirectTo({
			url: '/pages/login/index',
			success: () => plus.navigator.closeSplashscreen(),
		})
	},
	methods: {

	}
}
</script>
<style scoped>
.page {
	width: 100vw;
	height: 100vh;
	background-color: #111217;
}
</style>