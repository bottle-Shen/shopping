import request from '@/utils/request'

// 商品全部分类
export const getCategoryData = () => {
  return request.get('/category/list')
}
