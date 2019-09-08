import request from '@/utils/request'
export function specsList(params) {
  
  return request({
    url:'/serviceBrand',
    method:'get',
    params:params
  })
}

export function deletespecs(params) {
  return request({
    url:'/returnApply/delete',
    method:'post',
    params:params
  })
}
export function updateApplyStatus(id,data) {
  return request({
    url:'/returnApply/update/status/'+id,
    method:'post',
    data:data
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