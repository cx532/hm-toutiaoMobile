<template>
  <div>
    <van-dialog :value="value" @input="$emit('input', $event)" :show-confirm-button="false">
      <van-cell-group>
        <van-cell title="从相册选择" @click="choseFile" />
        <input type="file" style="display:none" ref="input" @change="changeFile">
        <!-- <input type="text" @input> -->
        <van-cell title="拍照" />
        <van-cell title="取消" @click="$emit('input', false)" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import { updateUserPhoto } from '@/api/user.js'

export default {
  name: 'UploadPhoto',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {}
  },

  computed: {},

  methods: {
    // input type="file" 文件发生改变(从无到右 从1到2)时,触发
    changeFile () {
      // 原生input DOM元素  其中files[0]->当前选中的图片文件数据
      const file = this.$refs['input'].files[0]
      // console.log(file) // 图片文件 ->  直接给img的src 用不了->src="图片网址  || 该图片的base64格式的编码"
      // 把接收到的file文件转换成src属性可以用的base64编码文件
      const reader = new FileReader()
      reader.readAsDataURL(file)
      // const that = this
      // reader处理文件是耗时的->当处理完毕后,会执行下面的事件的函数
      reader.onload = () => {
        // console.log(reader.result) // 这里是base64编码格式的图片
        // 预览图片???满屏显示图片的UI效果->找Vant组件库->ImagePreview

        ImagePreview({
          images: [reader.result],
          // startPosition: 1,
          showIndex: false,
          // 箭头函数的使用场景: 所有使用匿名函数的位置最好改为()=>{}

          onClose: () => {
            // 打开确认框
            this.openDia()
          }
        })
      }
    },

    openDia () {
      // Toast  this.$toast()
      this.$dialog
        .confirm({
          title: '是否确认选择该图片为头像??'
        })
        .then(() => {
          this.updatePhoto()
        })
        .catch(() => {
          // on cancel
        })
    },
    async updatePhoto () {
      const data = await updateUserPhoto('photo', this.$refs['input'].files[0])
      console.log(data)
      // data.photo -> 服务端把file文件转换成了图片url
      if (data.photo) {
        // 把data.photo交给父组件使用
        this.$emit('upload-success', data.photo)
        // 关闭对话框
        this.$emit('input', false)
      }
    },
    choseFile () {
      // 打开磁盘->input type="file"->1. input type="file" 2. 页面的交互->操作dom元素->ref

      // console.log(this.$refs['input'])
      // input type="file"的dom元素有很多js方法 ,其中click()方法就是打开磁盘
      this.$refs['input'].click()
    }
  }
}
</script>

<style>
</style>
