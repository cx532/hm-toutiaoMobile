<template>
  <div class="container">
    <!-- 导航-navBar -->
    <van-nav-bar title="首页|搜索" fixed />
    <!-- 内容：标签页和列表 -->
    <van-tabs v-model="activeChannelIndex" class="channel-tabs">
      <!-- 自定义按钮 -->
      <div slot="nav-right" class="wap-nav" @click="showChannel">
        <van-icon name="wap-nav"></van-icon>
      </div>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <van-pull-refresh
          :success-text="refreshSuccessText"
          v-model="item.downPullLoading"
          @refresh="onRefresh"
        >
          <!-- 列表  van-list -->
          <van-list
            v-model="item.upPullLoading"
            :finished="item.upPullFinished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="item in item.articles"
              :key="item.art_id.toString()"
              :title="item.title"
            >
              <template slot="label">
                <van-grid v-show="item.cover.type!==0" :border="false" :column-num="3">
                  <van-grid-item v-for="(src,index) in item.cover.images" :key="src+index">
                    <van-image :src="src" lazy-load />
                  </van-grid-item>
                </van-grid>

                <p>
                  <span>作者:{{item.aut_name}}</span>
                  &nbsp;
                  <span>评论 :{{item.comm_count}}</span>
                  &nbsp;
                  <span>时间:{{item.pubdate|relTime}}</span>
                  &nbsp;
                  <van-icon class="close" name="cross" @click="showMoreActionDia(item)"></van-icon>
                </p>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <more-action
      v-model="isShowDiaMore"
      @dislike-success="handleDislikeSuccess"
      :currentArticle="currentArticle"
    ></more-action>
    <!-- 频道管理 -->
    <channels
    :activeIndex="activeChannelIndex"
    :channels="channels"
    v-model="isShowPopChannel"
    @update:active-index="activeChannelIndex=$event">
    </channels>
  </div>
</template>

<script>
import { getChannelsUserOrDefault } from '@/api/channel.js'
import { getArticles } from '@/api/article.js'
import { mapState } from 'vuex'
import MoreAction from './components/more-action'
import Channels from './components/channels'
export default {
  name: 'HomeIndex',
  components: {
    MoreAction,
    Channels
  },
  data () {
    return {
      activeChannelIndex: 0,
      list: [],
      channels: [],
      currentArticle: null,
      isShowDiaMore: false,
      isShowPopChannel: false,
      refreshSuccessText: ''
    }
  },
  created () {
    this.loadChannels()
  },
  watch: {
    user (newV, oldV) {
      this.loadChannels()
      this.activeChannel.upPullLoading = true
      this.onLoad()
    }
  },
  computed: {
    ...mapState['user'],
    activeChannel () {
      return this.channels[this.activeChannelIndex]
    }
  },
  methods: {
    showChannel () {
      this.isShowPopChannel = true
    },
    handleDislikeSuccess () {
      const index = this.activeChannel.articles.findIndex(item => {
        return item === this.currentArticle
      })
      this.activeChannel.articles.splice(index, 1)
    },
    // 点击打开对话框
    showMoreActionDia (currentArticle) {
      this.currentArticle = currentArticle
      this.isShowDiaMore = true
      console.log(this.currentArticle)
    },
    async loadChannels () {
      const lsChannels = JSON.parse(window.localStorage.getItem('channels'))
      console.log(lsChannels)
      try {
        if (this.user || (!this.user && !lsChannels)) {
          const data = await getChannelsUserOrDefault()
          data.channels.forEach(item => {
            item.articles = [] // 当前频道的文章列表数据
            item.downPullLoading = false // 当前频道下拉状态
            item.upPullLoading = false // 当前频道上拉加载更多
            item.upPullFinished = false // 当前频道加载完毕
            item.timestamp = Date.now()
          })
          this.channels = data.channels
        }
        if (!this.user && lsChannels) {
          this.channels = lsChannels
        }
      } catch (error) {
        console.dir(error)
      }
    },
    // 下拉刷新的方法
    async onRefresh () {
      await this.$sleep(800)
      // 更新为最新时间戳
      this.activeChannel.timestamp = Date.now()
      const data = await this.loadArticle()
      // 如果有最新数据
      if (data.results.length) {
        // 重置数据
        this.activeChannel.articles = data.results
        // 重置时间戳
        this.activeChannel.timestamp = data.pre_timestamp
        // 为了保证数据是满屏的，手动调用onload事件
        this.onLoad()
        // 加个提示
        this.refreshSuccessText = '更新完毕'
      }
      this.refreshSuccessText = '无最新数据'
      // 停止加载动画
      this.activeChannel.downPullLoading = false
    },
    async loadArticle () {
      const { id: channel_id, timestamp } = this.activeChannel
      const data = await getArticles({
        channel_id,
        timestamp,
        with_top: 1
      })
      return data
    },
    // 加载更多的方法
    async onLoad () {
      await this.$sleep(800)
      let data = []
      data = await this.loadArticle()
      if (data.pre_timestamp && data.results.length === 0) {
        this.activeChannel.timestamp = data.pre_timestamp
        data = await this.loadArticle()
      }
      if (!data.pre_timestamp) {
        this.activeChannel.upPullLoading = false
        this.activeChannel.upPullFinished = true
        return
      }
      this.activeChannel.timestamp = data.pre_timestamp
      this.activeChannel.articles.push(...data.results)
      this.activeChannel.upPullLoading = false
    }
  }
}
</script>

<style scoped lang='less'>
.van-nav-bar {
  background-color: #1989fa;
  .van-nav-bar__title {
    color: #ffffff;
  }
}
.channel-tabs {
  margin-bottom: 100px;
}
//tab栏位置，固定定位
//局部样式作用在全局样式用深度选择（/deep/和>>>两种，但是>>>和预处理器不兼容）
.channel-tabs /deep/ .van-tabs__wrap {
  position: fixed;
  top: 92px; // 46 *2 -> 92
}
// 调整tabs的内容的位置
.channel-tabs /deep/ .van-tabs__content {
  margin-top: 192px;
}
</style>
