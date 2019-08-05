<template>
  <van-popup
  :value="value"
  @input="$emit('input',$event)"
  position="bottom"
  :style="{ height: '95%' }"
  >
    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">我的频道</span>
          <span class="desc">点击进入频道</span>
        </div>
        <div>
          <van-button
            type="danger"
            plain
            size="mini"
            @click="isEdit=!isEdit"
          >{{!isEdit?'编辑':'完成'}}</van-button>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item
          v-for="(item,index) in channels"
          :key="item.id"
          text="文字"
          @click="handleClickChannel(item,index)">
          <span class="text" :class="{active:activeIndex===index}">{{item.name}}</span>
          <van-icon v-if="isEdit===true&&index!==0" class="close-icon" name="close" />
        </van-grid-item>
      </van-grid>
    </div>

    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">频道推荐</span>
          <span class="desc">点击添加频道</span>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item
          v-for="(item,index) in restChannels"
          :key="item.id"
          text="文字"
          @click="handleAddClick(item,index)">
          <div class="info">
            <span class="text">{{item.name}}</span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </van-popup>
</template>

<script>
import { getAllChannels, resetUserChannels, delUserChannel } from '@/api/channel.js'
import { mapState } from 'vuex'
export default {
  name: 'HomeChannel',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    channels: {
      type: Array,
      default: () => []
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false
    }
  },
  computed: {
    ...mapState(['user']),
    // 筛选已有的频道，获取没有添加的频道
    restChannels () {
      const ids = this.channels.map(item => {
        return item.id
      })
      return this.allChannels.filter(item => {
        return !ids.includes(item.id)
      })
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    // 点击频道
    handleClickChannel (item, index) {
      if (!this.isEdit) {
        this.channelChannel(item, index)
      } else {
        if (index !== 0) {
          this.delChannel(item, index)
        } else {
        }
      }
    },
    // 删除频道
    async delChannel (item, index) {
      this.channels.splice(index, 1)
      // 如果登录了
      if (this.user) {
        try {
          // 发送请求
          await delUserChannel(item.id)
        } catch (error) {
          console.dir(error)
        }
      } else {
        // 本地删除,我们可以重新创建本地数据
        window.localStorage.setItem('channels', JSON.stringify(this.channels))
      }
    },
    // 进入频道
    channelChannel (item, index) {
      // 关闭模态框
      this.$emit('input', false)
      // 修改当前激活频道->子传父
      this.$emit('update:active-index', index)
    },
    // 添加频道
    async handleAddClick (item, index) {
      this.channels.push(item)
      if (this.user) {
        const channels = this.channels.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        // 发送请求
        const data = await resetUserChannels(channels)
        console.log(data)
      } else {
        // 像本地添加
        window.localStorage.setItem('channels', JSON.stringify(this.channels))
      }
    },
    async loadAllChannels () {
      const data = await getAllChannels()
      data.channels.forEach(item => {
        item.downPullLoading = false // 当前频道下拉状态
        item.upPullLoading = false // 当前频道上拉加载更多
        item.upPullFinished = false // 当前频道加载完毕
        item.timestamp = Date.now() // 为每个频道添加默认时间戳属性
        item.articles = [] // 为了控制个频道自己的文章列表数据
      })
      this.allChannels = data.channels
    }
  }
}
</script>
<style scoped lang='less'>
   .channel {
  .channel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .title {
      font-size: 30px;
      margin-right: 5px;
    }
    .desc {
      font-size: 12px;
    }
  }
  .channel-content {
    .text {
      font-size: 16px;
    }
    .active {
      color: red;
    }
    .close-icon {
      font-size: 20px;
      position: absolute;
      top: -5px;
      right: -5px;
      z-index: 999;
      background-color: #fff;
    }
    .info {
      display: flex;
      align-items: center;
    }
  }
}
</style>
