export default {
  requests (state, _1, _2, rootGetters) {
    const userId = rootGetters.userId
    return state.requests.filter(req => req.coachId === userId)
  },
  hasRequests (_, getters) {
    return getters.requests && getters.requests.length > 0
  }
}