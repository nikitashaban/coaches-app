export default {
  async addCoach (context, data) {
    const userId = context.rootGetters.userId
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    }
    const token = context.rootGetters.token
    const response = await fetch(`https://coaches-app.firebaseio.com/coaches/${userId}.json?auth=${token}`, {
      method: 'PUT',
      body: JSON.stringify(coachData)
    })
    if(!response.ok) {
      // error handling
    }
    context.commit('addCoach', {...coachData, id: userId})
  },
  async loadCoaches (context, paylaod) {
    if(!paylaod.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    const response = await fetch(`https://coaches-app.firebaseio.com/coaches.json`)
    const responseData = await response.json()

    if(!response.ok){
      throw new Error(responseData.message || 'failed to fetch')
    }
    const coaches = [];
    for(const key in responseData) {
      coaches.push({
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas
      })
    }
    context.commit('setCoaches', coaches)
    context.commit('setFetchTimestamp')
  }
}