<template>
  <view class="nav-bar">
    <image class="back click-active-max" src="/static/img/icon_back.png" @click="toBack" /><text class="title">{{ title }}</text>
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
  },
  methods: {
    toBack() {
      uni.navigateBack()
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  align-items: center;
  padding-top: 64px;

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

}
</style>