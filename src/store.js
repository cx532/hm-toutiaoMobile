import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 获取数据，防止刷新丢失token
    user: auth.getUser()
  },
  mutations: {
    setUser (state, data) {
      // 修改state，也就是更新token值
      state.user = data
      // 将数据放在本地储存
      auth.setUser(state.user)
    }
  }
})
