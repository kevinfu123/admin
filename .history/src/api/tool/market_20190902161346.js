import request from '@/utils/request'

export function tool(params) {
 
  return request({
    url:'/toolsMemberUpgrade',
    method:'get',
    params:params
  })
}


export function deletetool(id) {
  return request({
    url:'/toolsMemberUpgrade/'+id,
    method:'DELETE',
  })
}

export function edittool(id,params) {
    return request({
        url:'/toolsMemberUpgrade/'+id,
        method:'PATCH',
        data:params
    })
}

