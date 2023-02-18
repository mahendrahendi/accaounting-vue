import request from '@/utils/request'

export function getSupplierList(query) {
  return request({
    url: '/suppliers',
    method: 'get',
    params: query
  })
}

export function postSupplier(data) {
  return request({
    url: '/supplier',
    method: 'post',
    data
  })
}