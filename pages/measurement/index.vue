<template>
	<view class="page">
		<nav-bar :title="getTitle()" />
		<view class="body">
			<view class="xd-chart">
				<l-echart ref="chartRef" @finished="initChart"></l-echart>
			</view>
			<button class="btn" @click="toggleAnimation">
				{{ isPaused ? '开始' : '暂停' }}
			</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			chartInstance: null,
			timer: null,
			isPaused: false,
			// 增加数据点密度（如150个点），线条会更细腻
			dataList: new Array(150).fill(0),
			// 心跳模板：增加一些中间过渡值，让平滑效果更好
			heartBeatPattern: [0, 5, 10, 2, -5, 10, 30, 15, -10, -5, 0, 8, 5, 2, 0, 5, 10, 0, -5, -2, 0, 0, 0, 0],
			patternIndex: 999 // 初始设为大值，表示处于平直期
		}
	},
	methods: {
		async initChart() {
			this.chartInstance = await this.$refs.chartRef.init();
			const option = {
				// 1. 关键：关闭所有动画，防止暂停时由于补间动画产生的抖动
				animation: false,
				backgroundColor: 'transparent',
				grid: { top: 10, bottom: 10, left: 0, right: 0 },
				xAxis: { type: 'category', show: false },
				yAxis: { type: 'value', show: false, min: -15, max: 35 },
				series: [{
					type: 'line',
					symbol: 'none',
					smooth: true,      // 保持平滑
					connectNulls: true,
					silent: true,      // 禁用交互，提升性能
					lineStyle: {
						width: 3,
						color: {
							type: 'linear',
							x: 0, y: 0, x2: 1, y2: 0,
							colorStops: [
								{ offset: 0, color: '#38FFA7' },
								{ offset: 1, color: '#45F6FF' }
							]
						}
					},
					data: this.dataList
				}]
			};
			this.chartInstance.setOption(option);
			this.startAnimation();
		},

		startAnimation() {
			if (this.timer) clearInterval(this.timer);

			this.timer = setInterval(() => {
				if (this.isPaused) return;

				// 1. 波形逻辑控制
				let nextValue = 0;
				if (this.patternIndex < this.heartBeatPattern.length) {
					nextValue = this.heartBeatPattern[this.patternIndex] + (Math.random() * 2); 
					this.patternIndex++;
				} else {
					this.patternIndex = 0;
				}

				// 2. 数组更新（左滑效果）
				this.dataList.shift();
				this.dataList.push(nextValue);

				// 3. 极简更新，开启 notMerge 减少计算量
				this.chartInstance.setOption({
					series: [{ data: this.dataList }]
				}, false);

			}, 40); // 40ms 对应 25fps，是手机端流畅度与功耗的平衡点
		},

		toggleAnimation() {
			this.isPaused = !this.isPaused;
		},

		getTitle() {
			return "Heart Rate";
		}
	},
	beforeUnmount() {
		if (this.timer) clearInterval(this.timer);
		this.chartInstance?.dispose();
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
	padding-top: 80rpx;

	.xd-chart {
		width: 100%;
		height: 160rpx;
		/* 高度根据UI调整 */
	}
}

.btn {
	margin-top: 40rpx;
	width: 200rpx;
}
</style>