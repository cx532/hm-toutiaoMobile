<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,index) in comments" :key="index">
        <div slot="icon">
          <img class="avatar" :src="item.aut_photo" alt />
        </div>
        <div slot="title">
          <span>{{item.aut_name}}</span>
        </div>
        <div slot="default">
          <van-button icon="like-o" size="mini" plain>赞</van-button>
        </div>
        <div slot="label">
          <p>{{item.content}}</p>
          <p>
            <span>{{item.pubdate|relTime}}</span>
            <span @click="showReply(item)">回复</span>
          </p>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getCommentsOrReply } from '@/api/article.js'
import vm from '@/utils/event-bus.js'
export default {
  name: 'CommentList',
  props: {
    source: {
      type: [Number, String],
      // 不知道类型就写必须
      required: true
    },
    isComment: {
      type: Boolean
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      comments: [],
      offset: null
    }
  },
  created () {},
  computed: {
    article_id () {
      return this.$route.params.article_id
    }
  },
  methods: {
    showReply (item) {
      vm.$emit('reply-show', item)
    },
    async onLoad () {
      //   console.log('onLoad')
      this.$sleep(800)
      const data = await getCommentsOrReply({
        source: this.source,
        offset: this.offset,
        isComment: this.isComment
      })
      if (!data.results.length) {
        this.loading = false
        this.finished = true
      }
      if (data.results.length) {
        this.comments.push(...data.results)
        // 修改页码
        this.offset = data.last_id
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 10px;
}
</style>
