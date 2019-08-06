// 配置axios
// 如:baseURL 请求拦截器 响应拦截器
import axios from 'axios'
import store from '@/store.js'
import JSONBig from 'json-bigint'
import router from '@/router.js'
// 配置baseURL 并且返回axios实例对象->request
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

// 配置JSONBig包
request.defaults.transformResponse = [
  function (data) {
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data
    }
  }
]

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // console.log(config.url)
    const { user } = store.state
    // console.log(user)

    // 利用逻辑运算符简化if嵌套
    config.url !== '/app/v1_0/authorizations' &&
            user &&
            (config.headers.Authorization = `Bearer ${user.token}`)

    // 如果是非登录请求
    // if (config !== '/app/v1_0/authorizations') {
    //     // 如果用户登录了->token
    //     if (user) {
    //         //设置请求头
    //         config.headers.Authorization = `Bearer ${user.token}`
    //     }
    // }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器
// res->{message:,code:,data:{}}---->res.data
request.interceptors.response.use(
  function (response) {
    // 如果响应结果对象中有 data，则直接返回这个 data 数据
    // 如果响应结果对象中没有 data，则不作任何处理，直接原样返回这个数据
    return response.data.data || response.data
  },
  async function (error) {
    console.dir(error)
    // 在这里处理token失效的情况
    const { user } = store.state
    if (error.response.status === 401) {
      // 是否有用户
      if (!user) {
        // 去登录
        router.push({
          name: 'login'
        })
      } else {
        // 使用用户中的refresh_token更新失效的token
        try {
          // 发送请求
          const { data } = await axios({
            method: 'PUT',
            url: `http://ttapi.research.itcast.cn/app/v1_0/authorizations`,
            headers: {
              Authorization: `Bearer ${user.refresh_token}`
            }
          })

          // console.log(data)

          // 处理返回的数据,里面有新token->交给store
          store.commit('setUser', {
            token: data.data.token,
            refresh_token: user.refresh_token
          })

          // 返回响应->把之前的造成失效的请求 进行发送
          // error->中的config就是造成401的请求的config
          return request(error.config)
        } catch (error) {
          // 去登录
          router.push({
            name: 'login'
          })
        }
      }
    }

    return Promise.reject(error)
  }
)

export default request
