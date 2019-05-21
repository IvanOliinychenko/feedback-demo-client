// private
let token = null
let role = null

export default {
  getRole () {
    if (!role) {
      role = window.localStorage.getItem('role')
    }
    return role
  },
  setRole (val) {
    role = val
    window.localStorage.setItem('role', role)
  },
  getOAthToken () {
    if (!token) {
      token = window.localStorage.getItem('token')
    }
    return token
  },
  setOAthToken (val) {
    token = val
    window.localStorage.setItem('token', token)
  },
  clearCache () {
    token = null
    role = null
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('role')
  }
}
