<template>
  <!-- 遮罩层 -->
  <view v-if="visible" @touchmove.stop.prevent class="popup-overlay">
    <view class="body" @touchmove.stop>
      <view class="title">{{ title }}</view>
      <view class="sub-title">{{ content }}</view>

      <slot />

      <view class="action">
        <view class="cancel click-active-max" @click="handleCancel">cancel</view>
        <view class="m">|</view>
        <view class="ok click-active-max" @click="handleOk">ok</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ConfirmPopup',
  props: {
    // 弹窗显隐状态
    visible: {
      type: Boolean,
      default: false
    },
    // 顶部图片（参数）
    topImage: {
      type: String,
      default: '' // 改为可选，有默认值
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
  },
  methods: {
    handleOk() {
      this.$emit('ok')
    },
    handleCancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped lang="scss">
/* 遮罩层 */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  /* 半透明遮罩（非截图黑色背景） */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;


  .body {
    margin: 0 auto;
    position: absolute;
    bottom: 40rpx;

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
        line-height: 100%;
        font-weight: 400;
        font-size: 33rpx;
        color: #7D7E83;
        text-align: center;
      }

      .ok {
        width: 300rpx;
        line-height: 100%;
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

}
</style>