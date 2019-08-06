<template>
  <van-popup
    v-model="isShow"
    position="bottom"
    :style="{height:'75%'}"
  >
    <van-cell>
      <div slot="icon">
        <img class="avatar" :src="commentTop.aut_photo" alt />
      </div>
      <div slot="title">
        <span>{{commentTop.aut_name}}</span>
        <van-tag>楼主</van-tag>
      </div>
      <div slot="default">
        <van-button icon="like-o" size="mini" plain>赞</van-button>
      </div>
      <div slot="label">
        <p>{{commentTop.content}}</p>
        <p>
          <span>{{commentTop.pubdate | relTime}}</span>
        </p>
      </div>
    </van-cell>
    <hr>
  </van-popup>
</template>

<script>
import vm from "@/utils/event-bus.js";
export default {
  name: "ReplyList",
  data() {
    return {
      isShow: false,
      commentTop: {}
    };
  },
  created(){
      vm.$on('reply-show',commentTop=>{
          this.commentTop = commentTop
          this.isShow = true
      })
  }
};
</script>

<style lang='less' scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 10px;
}
</style>