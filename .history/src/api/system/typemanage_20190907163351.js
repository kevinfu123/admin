import request from '@/utils/request'

export function typeList(params) {
 
  return request({
    url:'/category',
    method:'get',
    params:params
  })
}

export function catecut() {
 
  return request({
    url:'/cateCut',
    method:'get'
  })
}
export function addmanage(params) {
  return request({
    url:'/category',
    method:'POST',
    params:params
  })
}

export function edittype(id,params) {
    return request({
      url:'/category/'+id,
      method:'POST',
      data:params
    })
}

export function editstatus(params) {
    return request({
      url:'/indexNeedsShow/'+params.id +'/'+params.show,
      method:'GET',
    })
}