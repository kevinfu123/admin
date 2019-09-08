import request from '@/utils/request'
export function serveList(params) {
  return request({
    url:'/serviceBrand',
    method:'get',
    params:params
  })
}

export function deleteserve(params) {
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

export function editserve(id) {
  return request({
    url:'/returnApply/'+id,
    method:'get'
  })
}

export function servetype(pid) {
  return request({
    url:'/getChildrenCategory/'+pid,
    method:'get'
  })
}