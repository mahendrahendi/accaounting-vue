import request from '@/utils/request'

export function getItemList(query) {
  return request({
    url: '/suppliers',
    method: 'get',
    params: query
  })
}

export function postItem(data) {
  return request({
    url: '/item',
    method: 'post',
    data
  })
}