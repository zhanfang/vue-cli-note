import cookie from 'react-cookie'

let cookieConfig = {}

export function saveCookie (name, value) {
  cookie.save(name, value, cookieConfig)
}

export function getCookie (name) {
  return cookie.load(name)
}
export function removeCookie (name) {
  cookie.remove(name, cookieConfig)
}
export function signOut () {
  cookie.remove('token', cookieConfig)
}
export function isLogin () {
  return !!cookie.load('token')
}
