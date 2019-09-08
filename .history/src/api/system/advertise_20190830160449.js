import request from '@/utils/request'

export function advertiseList(params) {
  return request({
    url:'/adBanner',
    method:'get',
    params:params
  })
}

export function addadvertise(params) {
  return request({
    url:'/adBanner',
    method:'POST',
    params:params
  })
}

export function deleteadverltise(id) {
  return request({
    url:'/adBanner/'+id,
    method:'DELETE',
  })
}

export function editadvertise(id,params) {
  return request({
    url:'/adBanner/'+id,
    method:'PATCH',
    data:params
  })
}

