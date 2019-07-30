<template>
  <div class="container">
    <van-nav-bar title="登录" />
    <form action="/" method="post">
      <van-cell-group>
        <van-field
          v-model="user.mobile"
          v-validate="'required|phone'"
          name="phone"
          :error-message="errors.first('phone')"
          required
          clearable
          label="手机号"
          right-icon="question-o"
          placeholder="请输入手机号"
        />
        <van-field v-model="user.code" type="text" label="验证码" placeholder="请输入验证码" required />
      </van-cell-group>
      <van-button :loading="loginLoading" @click.prevent="handleLogin" type="info" block>登录</van-button>
    </form>
  </div>
</template>

<script>
import { login } from '@/api/user.js'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '18801185985',
        code: '246810'
      },
      loginLoading: false
    }
  },
  methods: {
    handleLogin () {
      this.loginLoading = true
      try {
        this.$validator.validate().then(async valid => {
          if (!valid) {
            return
          }
          const data = await login(this.user)
          //   console.log(data)
          this.$store.commit('setUser', data)
          this.loginLoading = false
          this.$router.push('/')
        })
      } catch (error) {
        this.loginLoading = false
        console.log(error)
      }
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
</style>
