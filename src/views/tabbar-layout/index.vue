<template>
  <div>

    <!-- <keep-alive> -->
    <router-view></router-view>
    <!-- </keep-alive> -->

    <!--
  首页
  我的

  route为true->开启了路由模式
 -->
    <van-tabbar active-color="#07c160" inactive-color="#000" v-model="activeIndex" route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/mine">{{$store.state.user?'我的':'未登录'}}</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
export default {
  name: 'TabBarIndex',
  data () {
    return {
      activeIndex: 1
    }
  }
}
</script>

<style lang='less' scoped>
</style>
