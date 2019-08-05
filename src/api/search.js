import request from '@/utils/request.js'

/**
 * 联想建议
 */
export const getSuggestions = (q) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
// 获取搜索结果
export const getSearchResult = ({ page, per_page, q }) => {
  return request({
    method: 'get',
    url: `/app/v1_0/search`,
    params: {
      page,
      per_page,
      q
    }
  })
}
