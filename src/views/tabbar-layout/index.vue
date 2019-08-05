<template>
  <div class="container">
    <!-- vue自带的标签 -->
    <!-- <keep-alive> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
    <!-- 底部-tabbar -->
    <van-tabbar v-model="activeIndex" active-color="#07c160" inactive-color="#000">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'TabBarIndex',
  data () {
    return {
      activeIndex: 0
    }
  }
}
</script>

<style scoped lang='less'>
</style>
