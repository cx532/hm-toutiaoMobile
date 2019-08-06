<template>
  <div class="auth-info">
    <div class="base-info">
      <img class="avatar" :src="article.aut_photo" alt="">
      <div>
        <p>{{article.aut_name}}</p>
        <p>{{article.pubdate|relTime}}</p>
      </div>
    </div>
    <div>
      <van-button @click="handleFollow" type="!article.is_follow?'danger':'default'" :loading="loading">{{!article.is_follow?'关注':'已关注'}}</van-button>
    </div>
  </div>
</template>

<script>
import {unFollowUser,followUser} from '@/api/user.js'
import {mapState} from 'vuex'
export default {
  name: 'AuthInfo',
  props: {
      article:{
          type:Object,
          default:()=>{}
      }
  },
  data() {
    return {
        loading:false
    }
  },
  computed: {
      ...mapState(['user'])
  },
  methods: {
     async handleFollow(){
         this.loading = true
         if(!this.user){
             this.$toast('请登录')
             return
         }
         if(this.article.is_follow){
             //取消关注
             await unFollowUser(this.article.aut_id)
             this.article.is_follow = false
         } else {
            //关注用户
            await followUser(this.article.aut_id)
            this.article.is_follow = true
         }
         this.loading = false
     } 
  },
}
</script>

<style lang="less" scoped>
.auth-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 26px;
  .base-info {
    display: flex;
    align-items: center;
  }
  .avatar {
    margin-right: 10px;
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }
}
</style>
