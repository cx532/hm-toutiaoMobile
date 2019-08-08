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
/**
 * 文章详情
 */
export const getArticleById = article_id => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${article_id}`
  })
}

/**
 * 获取评论或评论回复
 * 文章评论
 * type	是	a或c	评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
 * source	是		源id，文章id或评论id
 * offset	否		获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
 * limit	否		获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
 *
 * 分页数据的控制参数
 * pagenum 和 pagesize total
 * 这里的offset就是之前的页码 或者是时间戳
 * 这里的limit就是之前的每页数量 或者 时间戳每页数据
 */

export const getCommentsOrReply = ({ isComment = true, source, offset = null }) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/comments`,
    params: {
      type: isComment ? 'a' : 'c',
      source,
      offset
      // limit
    }
  })
}
/**
 * 添加评论 || 添加回复
 *
 * target	integer	必须		评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
 * content	string	必须		评论内容
 * art_id	integer	非必须		文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
 */

export const addCommentOrReply = ({ target, content = '', art_id = null }) => {
  return request({
    method: 'POST',
    url: `/app/v1_0/comments`,
    data: {
      target, // 发布评论->文章id 发表回复->评论id
      content,
      art_id // 发布评论->不需要传  发布回复->文章id
    }
  })
}
