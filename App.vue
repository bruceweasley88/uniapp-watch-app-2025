<script>
export default {
	onLaunch: function () {
		console.log('App Launch')
	},
	onShow: function () {
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	}
}
</script>

<style>
@font-face {
	font-family: 'Alibaba PuHuiTi';
	src: url('/static/Alibaba-PuHuiTi-Regular.otf');
	font-display: swap;
}

@font-face {
	font-family: 'Alibaba Medium';
	src: url('/static/Alibaba-PuHuiTi-Medium.otf');
	font-display: swap;
}

@font-face {
	font-family: 'Alibaba Heavy';
	src: url('/static/Alibaba-PuHuiTi-Heavy.otf');
	font-display: swap;
}



/* 全局应用字体 */
* {
	font-family: 'Alibaba PuHuiTi', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
}

page {
	overflow-x: hidden;
}

.color-white {
	color: #FFFFFF;
}

/*每个页面公共css */
</style>
