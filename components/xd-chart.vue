<template>
  <view 
    class="heart-rate-box" 
    :style="{ '--play-state': isRunning ? 'running' : 'paused' }"
  >
    <view class="wave-bar"></view>
    <view class="wave-bar"></view>
    <view class="gradient-overlay"></view>
  </view>
</template>

<script>
export default {
  name: 'HeartRateWave',
  props: {
    // 控制动画是否播放：true 为播放，false 为原地暂停
    isRunning: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.heart-rate-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  position: relative;
  background-color: #111217;

  /* 边缘羽化，消除背景衔接边缘感 */
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 15%,
    black 50%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 15%,
    black 50%,
    transparent 100%
  );
}

.wave-bar {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  /* 使用你提供的 SVG 路径数据 */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 100' preserveAspectRatio='none'%3E%3Cpath fill='none' stroke='%23FFFFFF' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' d='M0,50 L20,50 L25,45 L30,40 L35,48 L40,55 L45,40 L50,20 L55,35 L60,60 L65,55 L70,50 L75,42 L80,45 L85,48 L90,50 L95,45 L100,40 L105,50 L110,55 L115,52 L120,50 L150,50 L155,45 L160,40 L165,48 L170,55 L175,40 L180,20 L185,35 L190,60 L195,55 L200,50 L205,42 L210,45 L215,48 L220,50 L225,45 L230,40 L235,50 L240,55 L245,52 L250,50 L300,50 L305,45 L310,40 L315,48 L320,55 L325,40 L330,20 L335,35 L340,60 L345,55 L350,50 L355,42 L360,45 L365,48 L370,50 L375,45 L380,40 L385,50 L390,55 L395,52 L400,50 L450,50 L455,45 L460,40 L465,48 L470,55 L475,40 L480,20 L485,35 L490,60 L495,55 L500,50 L505,42 L510,45 L515,48 L520,50 L525,45 L530,40 L535,50 L540,55 L545,52 L550,50 L600,50'/%3E%3C/svg%3E");
  background-size: 100% 100%;
  
  /* 核心逻辑：应用动画并绑定状态 */
  animation: move-wave 5s linear infinite;
  animation-play-state: var(--play-state); 
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #38FFA7, #45F6FF);
  mix-blend-mode: multiply;
  pointer-events: none;
}

/* 关键帧：水平位移，实现无缝循环 */
@keyframes move-wave {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>