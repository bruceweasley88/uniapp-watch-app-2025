<template>
  <view class="circle-progress-container">
    <view class="chart-box">
      <l-echart ref="chartRef" @finished="initChart"></l-echart>
    </view>

    <view class="slot-content">
      <slot></slot>
    </view>
  </view>
</template>

<script>

export default {
  name: 'CircleProgress',
  props: {
    max: {
      type: Number,
      default: 100
    },
    current: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      chartInstance: null
    };
  },
  watch: {
    // 监听数值变化，动态更新图表
    current() {
      this.updateCurrent();
    },
    max() {
      this.updateChart();
    }
  },
  methods: {
    async initChart() {
      this.chartInstance = await this.$refs.chartRef.init();
      this.updateChart();
    },
    updateChart() {
      if (!this.chartInstance) return;

      const option = {
        backgroundColor: 'transparent',
        series: [
          {
            type: 'gauge',
            startAngle: 90, // 从正上方开始
            endAngle: -270, // 旋转一圈
            min: 0,
            max: this.max,
            splitNumber: 0, // 不显示刻度
            axisLine: {
              lineStyle: {
                width: 10, // 进度条宽度
                color: [[1, '#1E2026']] // 底色/背景环颜色
              }
            },
            progress: {
              show: true,
              width: 10,
              roundCap: true, // 关键：两端圆角
              itemStyle: {
                // 渐变色设置
                color: {
                  type: 'linear',
                  x: 0, y: 0, x2: 0, y2: 1, // 垂直渐变，可根据视觉微调
                  colorStops: [
                    { offset: 0, color: '#38FFA7' },
                    { offset: 1, color: '#45F6FF' }
                  ]
                }
              }
            },
            pointer: { show: false }, // 隐藏指针
            axisTick: { show: false }, // 隐藏刻度线
            splitLine: { show: false }, // 隐藏分割线
            axisLabel: { show: false }, // 隐藏数字标签
            data: [{ value: this.current }],
            detail: { show: false }    // 隐藏详情数值
          }
        ]
      };

      this.chartInstance.setOption(option);
    },
    updateCurrent() {
      this.chartInstance.setOption({
        series: [{ data: [{ value: this.current }] }]
      }, false, true);
    }
  }
};
</script>

<style scoped>
.circle-progress-container {
  position: relative;
  width: 100%;
  /* 默认大小，可由父级控制 */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chart-box {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.slot-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>