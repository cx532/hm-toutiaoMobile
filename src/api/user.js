import request from '@/utils/request.js'

// 用户登陆
export const login = ({ mobile, code }) => {
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}
// 取消关注
export const unFollowUser = user_id => {
  return request({
      method: 'DELETE',
      url: `/app/v1_0/user/followings/${user_id}`
  })
}

// 关注用户
export const followUser = user_id => {
  return request({
      method: 'POST',
      url: `/app/v1_0/user/followings`,
      data: {
          target: user_id
      }
  })
}