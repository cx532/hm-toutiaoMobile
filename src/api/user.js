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
/**
 * 获取用户自己信息
 * 接口文档的目标id 不用传->忽略
 */

export const getCurrentUserInfo = () => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user`
  })
}
// 编辑用户个人资料（包含实名认证）
// name	string	非必须		昵称
// photo	string	非必须		头像 base64编码处理
// gender	integer	非必须		性别，0-男，1-女
// birthday	string	非必须		生日，格式'2018-12-20'
// real_name	string	非必须		真实姓名
// id_number	string	非必须		身份证号
// id_card_front	string	非必须		身份证正面照片 base64编码处理
// id_card_back	string	非必须		身份证背面照片 base64编码处理
// id_card_handheld	string	非必须		手持身份证照片 base64编码处理
// intro	string	非必须		个人介绍
export const patchCurrentProfileInfo = ({
  name,
  photo,
  gender,
  birthday,
  real_name,
  id_number,
  id_card_front,
  id_card_back,
  id_card_handheld,
  intro
}) => {
  return request({
    method: 'PATCH',
    url: `/app/v1_0/user/profile`,
    data: {
      name,
      photo,
      gender,
      birthday,
      real_name,
      id_number,
      id_card_front,
      id_card_back,
      id_card_handheld,
      intro
    }
  })
}
