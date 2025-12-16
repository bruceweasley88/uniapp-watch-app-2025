<template>
  <!-- 遮罩层 -->
  <view v-if="visible" @click="handleOverlayClick" @touchmove.stop.prevent class="popup-overlay">
    <!-- 弹窗容器 -->
    <view @click.stop class="popup-container">
      <!-- 顶部图片（参数配置） -->
      <image class="popup-top-img" :src="topImage" mode="widthFix" />

      <!-- 标题 -->
      <view class="popup-title">
        <text>{{ title }}</text>
      </view>

      <!-- 正文 -->
      <view class="popup-content">
        <text>{{ content }}</text>
      </view>

      <!-- 渐变按钮 -->
      <view class="popup-button click-active" @click="handleOk">
        <text>{{ buttonText }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'AlertPopup',
  props: {
    // 弹窗显隐状态
    visible: {
      type: Boolean,
      default: false
    },
    // 顶部图片（参数）
    topImage: {
      type: String,
      required: true
    },
    // 标题文字
    title: {
      type: String,
      default: ''
    },
    // 正文内容
    content: {
      type: String,
      default: ''
    },
    // 按钮文字（参数）
    buttonText: {
      type: String,
      default: 'OK'
    }
  },
  methods: {
    handleOk() {
      this.$emit('ok')
      this.$emit('update:visible', false)
    },
    handleOverlayClick() {
      this.$emit('ok')
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped>
/* 遮罩层 */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  /* 半透明遮罩（非截图黑色背景） */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}


/* 弹窗容器 */
.popup-container {
  background: #FFFFFF;
  border-radius: 24px;
  padding: 32px 20px;
  width: calc(100% - 64px);
  max-width: 400px;
  margin: 0 32px;
  position: relative;
  z-index: 1;
  margin-top: 80px;
}


.popup-top-img {
  position: absolute;
  width: 140px;
  height: 140px;
  left: calc(50% - 70px);
  top: -70px;
}

/* 标题样式 */
.popup-title {
  font-size: 22px;
  color: #1C1F2A;
  font-weight: bold;
  margin-bottom: 14px;
  font-weight: bold;
  font-family: 'Alibaba Medium';
  text-align: center;
  margin-top: 40px;
}

/* 正文样式 */
.popup-content {
  font-size: 16px;
  color: #60626A;
  margin-bottom: 28px;
}

/* 渐变按钮 */
.popup-button {
  background: linear-gradient(90deg, #38FFA7 0%, #45F6FF 100%);
  /* 按钮渐变 */
  border-radius: 16px;
  /* 按钮圆角 */
  padding: 17px 0;
  font-size: 22px;
  color: #1C1F2A;
  font-weight: bold;
  font-family: 'Alibaba Medium';
  text-align: center;
}
</style>