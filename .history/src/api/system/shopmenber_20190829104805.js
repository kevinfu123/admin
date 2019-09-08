import request from '@/utils/request'

export function menberList(params) {
 
  return request({
    url:'/storeMemberLevel',
    method:'get',
    params:params
  })
}

export function addmenber(params) {
 
  return request({
    url:'/storeMemberLevel',
    method:'POST',
    params:params
  })
}

export function deletemenber(id) {
  return request({
    url:'/storeMemberLevel/'+id,
    method:'DELETE',
  })
}

export function editmenber(id,params) {
    return request({
      url:'/storeMemberLevel/'+id,
      method:'PATCH',
      data:params
    })
  }

