import request from '@/utils/request'

export function fieldList(params) {
 
  return request({
    url:'/storeBasicLevel',
    method:'get',
    params:params
  })
}

export function addtem(params) {
 
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

export function edittem(id,params) {
    return request({
      url:'/storeBasicLevel/'+id,
      method:'POST',
      data:params
    })
}

