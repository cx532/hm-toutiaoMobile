<template>
  <div class="article">
    <!-- 导航 -->
    <van-nav-bar title="黑马头条" left-text="返回" left-arrow @click-left="$router.back()"></van-nav-bar>
    <div>
      <!-- 文章标题 -->
      <h2 class="article-title">{{article.title}}</h2>
      <!-- 作者信息 -->
      <auth-info :article="article"></auth-info>
      <!-- 文章内容 -->
      <div class="article-content" v-html="article.content">

      </div>
      <!-- 更多操作 -->
      <more-action></more-action>
      <!-- 评论列表 -->
      <comment-list></comment-list>
      <!-- 回复列表 -->
      <reply-list></reply-list>
    </div>
  </div>
</template>

<script>
import AuthInfo from './components/auth-info.vue'
import MoreAction from './components/more-action.vue'
import CommentList from './components/comment-list.vue'
import ReplyList from './components/reply-list.vue'

import {getArticleById} from '@/api/article.js'
export default {
  name: 'ArticleIndex',
  components: {
    AuthInfo,
    MoreAction,
    CommentList,
    ReplyList
  },
  data() {
    return {
        article:{}
    }
  },
  computed: {
      article_id(){
          return this.$route.params.article_id
      }       
  },
  created() {
      this.loadArticle()
  },
  methods: {
      async loadArticle(){
          const data = await getArticleById(this.article_id)
          console.log(data)
          this.article = data
      }
  }
}
</script>

<style lang="less" scoped>
.article {
  // padding: 20px;
  .article-title {
    font-size: 40px;
    font-weight: 400px;
  }
  .article-content {
    font-size: 20px;
  }
}
</style>