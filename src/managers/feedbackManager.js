import http from '../services/httpService'

export default {
  createFeedback (data) {
    return http.post('feedback', data)
      .then(response => {
        return response
      })
      .catch(e => {
        throw new Error(e)
      })
  },

  getFeedbacks (data) {
    var params = {}
    if (data.minRating || data.minRating === 0) params.minRating = data.minRating
    if (data.maxRating || data.maxRating === 0) params.maxRating = data.maxRating
    if (data.order) params.order = data.order
    if (data.offset || data.offset === 0) params.offset = data.offset
    if (data.startDate) params.startDate = data.startDate
    if (data.endDate) params.endDate = data.endDate

    return http.get('feedback', {
      params: params
    })
      .then(response => {
        return response
      })
      .catch(e => {
        throw new Error(e)
      })
  }
}
