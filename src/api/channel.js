import request from '@/utils/request.js'
// 获取频道列表数据
// 1. 如果headers设置了Authorization为token->获取用户关注的频道
// 2. 反之,获取默认推荐的频道
export const getChannelsUserOrDefault = () => {
  return request({
    method: 'get',
    url: `/app/v1_0/user/channels`
  })
}
export const getAllChannels = () => {
  return request({
    method: 'get',
    url: `/app/v1_0/channels`
  })
}
export const resetUserChannels = channels => {
  return request({
    method: 'PUT',
    url: `/app/v1_0/user/channels`,
    data: {
      channels
    }
  })
}
// 删除用户频道
export const delUserChannel = channel_Id => {
  return request({
    method: 'delete',
    url: `/app/v1_0/user/channels/${channel_Id}`
  })
}
