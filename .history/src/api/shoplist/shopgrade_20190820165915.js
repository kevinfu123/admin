import request from '@/utils/request'
export function shopList(params) {
 
  return request({
    url:'/storeBasicLevel',
    method:'get',
    params:params
  })
}

export function deleteshop(id) {
  return request({
    url:'/storeBasicLevel/'+id,
    method:'DELETE',
  })
}



