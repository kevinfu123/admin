import request from '@/utils/request'
export function serveList(params) {
  // var date=new Date();
  // var timer=date.getTime().toString(); ?t=+timer
  return request({
    url:'/serviceBrand',
    method:'get',
    headers:[{Authorization:'Bearer fSbE53DK7yxsvRBQDyglCHE8wy8RHhVT4gwqoqFOyVp2KuQn33VE4hrSwba8VF6cuPm5J98pmovRM8JQ1dwfz2LGMskKpI3tnla8Bq2bjgj3IHYqu6bOAmYfs9pLvbRl'},
            {'cache-control':'no-cach'}
    ],
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