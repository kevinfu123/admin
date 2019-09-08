import request from '@/utils/request'

export function fieldList(params) {
 
  return request({
    url:'/serviceRealm',
    method:'get',
    params:params
  })
}

export function addfield(params) {
 
  return request({
    url:'/serviceRealm',
    method:'POST',
    params:params
  })
}

export function deletefield(id) {
  return request({
    url:'/serviceRealm/'+id,
    method:'DELETE',
  })
}

export function editfield(id,params) {
    return request({
      url:'/serviceRealm/'+id,
      method:'PATCH',
      data:params
    })
}

