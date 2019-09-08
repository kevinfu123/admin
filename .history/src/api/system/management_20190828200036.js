import request from '@/utils/request'

export function deletenuit(id) {
    return request({
      url:'/serviceUnit/'+id,
      method:'DELETE',
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
        method:'POST',
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