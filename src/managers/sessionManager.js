import http from '../services/httpService'

export default {
  createSession () {
    return http.post('session')
      .then(response => {
        return response
      })
      .catch(e => {
        throw new Error(e)
      })
  }
}
