import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/returnApply/list',
    method:'get',
    params:params
  })
}

export function deleteApply(params) {
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

export function getApplyDetail(id) {
  return request({
    url:'/returnApply/'+id,
    method:'get'
  })
}

//资金详情api
export function zijinList(data) {
  return request({
    url:'/returnApply/',
    method:'get',
    data:data
  })
}

//个人信息
export function allApply(data) {
  return request({
    url:'/returnApply/',
    method:'post',
    data:data
  })
}