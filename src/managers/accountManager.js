import http from '../services/httpService'
import cache from './cacheManager'

export default {
  getOAthToken (data) {
    return http.get('signin', {
      params: {
        clientId: process.env.OAUTH_CLIENT_ID,
        grantType: process.env.OAUTH_GRANT_TYPE,
        name: data.name,
        password: data.password
      }
    })
      .then(response => {
        cache.setOAthToken(response.data.accessToken)
        cache.setRole(response.data.role)
        return response
      })
      .catch(e => {
        throw new Error(e)
      })
  }
}
