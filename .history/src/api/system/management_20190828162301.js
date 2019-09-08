import request from '@/utils/request'

export function deletenuit(params) {
    return request({
      url:'/returnApply/delete',
      method:'post',
      params:params
    })
  }


export function nuitList() {
    return request({
        url:'/serviceUnit',
        method:'get',
    })
}

export function addunit(data) {
    return request({
        url:'/serviceUnit',
        method:'get',
        data:data
    })
}

export function editunit(id,data) {
    return request({
        url:'/serviceUnit/'+id,
        method:'PATCH',
        data:data
    })
}