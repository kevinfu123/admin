import request from '@/utils/request'
export function specsList(params) {
  
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
export function updateApplyStatus(id,data) {
  return request({
    url:'/returnApply/update/status/'+id,
    method:'post',
    data:data
  })
}

export function addspecs(params) {
  return request({
    url:'/returnApply/'+id,
    method:'post',
    data:params
  })
}

export function editspecs(id) {
  return request({
    url:'/returnApply/'+id,
    method:'get'
  })
}

export function specstype(pid) {
  return request({
    url:'/getChildrenCategory/'+pid,
    method:'get'
  })
}