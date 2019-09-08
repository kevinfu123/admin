import Cookies from 'js-cookie'
//登入的token
const TokenKey = 'loginToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const name = 'username'

export function getName() {
  return Cookies.get(name)
}

export function setName(name) {
  return Cookies.set(name, name)
}

export function removeName() {
  return Cookies.remove(name)
}

const user_id = 'user_id'
export function getId() {
  return Cookies.get(name)
}

export function setId(user_id) {
  return Cookies.set(user_id, user_id)
}

export function removeId() {
  return Cookies.remove(user_id)
}