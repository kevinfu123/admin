import request from '@/utils/request'

export function adverlocList(params) {
  return request({
    url:'/storeMemberLevel',
    method:'get',
    data:params
  })
}

export function addadverloc(params) {
  return request({
    url:'/storeMemberLevel',
    method:'POST',
    params:params
  })
}

export function deleteadverloc(id) {
  return request({
    url:'/storeMemberLevel/'+id,
    method:'DELETE',
  })
}

export function editadverloc(id,params) {
  return request({
    url:'/storeMemberLevel/'+id,
    method:'PATCH',
    data:params
  })
}

