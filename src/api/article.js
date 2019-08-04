// 文章相关的api

import request from '@/utils/request.js'
export const getArticles = ({ channel_id, timestamp, with_top = 1 }) => {
  return request({
    method: 'get',
    url: `/app/v1_1/articles`,
    params: {
      channel_id,
      timestamp,
      with_top
    }
  })
}

export const dislikeArticle = article_Id => {
  return request({
    method: 'post',
    url: `/app/v1_0/article/dislikes`,
    data: {
      target: article_Id
    }
  })
}
export const reportArticleByIdAndType = ({
  article_Id,
  type = 0,
  remark = ''
}) => {
  return request({
    method: 'post',
    url: `/app/v1_0/article/reports`,
    data: {
      target: article_Id,
      type,
      remark: ''
    }
  })
}
