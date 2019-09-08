import request from '@/utils/request'
export function specsList(params) {
  let data = params;
  return request({
    url:'/serviceSpecAttr',
    method:'get',
    data:data
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
    url:'/serviceSpecAttr',
    method:'post',
    data:params
  })
}

export function editspecs(id,params) {
  return request({
    url:'/serviceSpecAttr/'+id,
    method:'POST',
    data:params
  })
}

export function specstype(pid) {
  return request({
    url:'/getChildrenCategory/'+pid,
    method:'get'
  })
}