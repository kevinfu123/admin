import request from '@/utils/request'
export function specsList(params) {
  //let data = params;
  return request({
    url:'/serviceSpecAttr',
    method:'get',
    params:params
  })
}

export function deletespecs(id) {
  return request({
    url:'/serviceSpecAttr/'+id,
    method:'DELETE',
  })
}
export function updateApplyStatus(params) {
  return request({
    url:'/serviceSpecAttrShow/'+params.id +'/'+params.show,
    method:'get',
  })
}

export function addspecs(params) {
  return request({
    url:'/serviceSpecAttr',
    method:'post',
    data:params
  })
}

export function editspecs(id,params) {
  return request({
    url:'/serviceSpecAttr/'+id,
    method:'PATCH',
    data:params
  })
}

export function specstype(pid) {
  return request({
    url:'/getChildrenCategory/'+pid,
    method:'get'
  })
}