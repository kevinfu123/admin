import request from '@/utils/request'
//登入
export function login(username, password) {
  return request({
    url: '/adminLogin',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
//拉取用户信息
export function getInfo() {
  return request({
    url: '/admin/info',
    method: 'get',
  })
}
//登出
export function logout(id) {
  return request({
    url: '/adminLogout/'+id,
    method: 'PATCH'
  })
}
