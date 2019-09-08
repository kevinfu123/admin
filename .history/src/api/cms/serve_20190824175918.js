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
export function updateApplyStatus(data) {
  return request({
    url:'/serviceBrandShow/'+data.id+'/'+data.show,
    method:'GET',
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