<template>
  <view class="nav-bar">
    <image class="back click-active-max" src="/static/img/icon_back.png" @click="toBack" />
    <text class="title">{{ title}}</text>
    <view class="button click-active" v-if="buttonText" @click="onClickButton">{{ buttonText }}</view>
  </view>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    // 标题文字
    title: {
      type: String,
      default: ''
    },
    buttonText: {
      type: String,
      default: ''
    }
  },
  methods: {
    toBack() {
      uni.navigateBack()
    },
    onClickButton() {
      this.$emit('clickButton');
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  align-items: center;
  padding-top: 64px;
  position: relative;

  .back {
    width: 25px;
    height: 20px;
    padding-left: 30px;
  }

  .title {
    color: #FFFFFF;
    font-weight: 500;
    font-size: 20px;
    margin-left: 16px;
    font-family: 'Alibaba Medium';
  }

  .button {
    height: 55rpx;
    line-height: 55rpx;
    border-radius: 15rpx;
    padding: 0 30rpx;
    background: linear-gradient(90deg, #38FFA7 0%, #45F6FF 100%);
    position: absolute;
    right: 40rpx;
    font-family: 'Alibaba Medium';
  }

}
</style>