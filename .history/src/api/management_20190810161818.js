import request from '@/utils/request'

export function deleteApply(params) {
    return request({
      url:'/returnApply/delete',
      method:'post',
      params:params
    })
  }

//api
export function nuitList(data) {
    return request({
        url:'/returnApply/',
        method:'get',
        data:data
    })
}

export function addunit(data) {
    return request({
        url:'/returnApply/',
        method:'get',
        data:data
    })
}