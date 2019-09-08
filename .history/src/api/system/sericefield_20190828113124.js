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
    url:'/storeBasicLevel',
    method:'POST',
    params:params
  })
}

export function deletefield(id) {
  return request({
    url:'/storeBasicLevel/'+id,
    method:'DELETE',
  })
}

export function editfield(id,params) {
    return request({
      url:'/storeBasicLevel/'+id,
      method:'POST',
      data:params
    })
}

