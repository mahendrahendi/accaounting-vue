import request from '@/utils/request'

export function getBillList(query) {
  return request({
    url: '/bills',
    method: 'get',
    params: query
  })
}

export function postBill(data) {
  return request({
    url: '/bill',
    method: 'post',
    data
  })
}

export function getBillById(id) {
  return request({
    url: '/bill/' + id,
    method: 'get'
  })
}

export function getBillHeader() {
  return request({
    url: '/bill/header',
    method: 'get'
  })
}