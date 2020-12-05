<template>
<div>
  <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
    <p>{{error}}</p>
  </base-dialog>
  <section>
    <coach-filter @change-filter="setFilters"></coach-filter>
  </section>
  <base-card>
    <div class="controls">
      <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
      <base-button link to="auth?redirect=register" v-if="!loggedIn">Login to Register as coach</base-button>
      <base-button link to="register" v-if="loggedIn && !isCoach && !isLoading"
        >Register coach</base-button
      >
    </div>
    <div v-if="isLoading">
    <base-spinner></base-spinner>
    </div>
    <ul v-else-if="hasCoaches">
      <coach-item
        v-for="coach in filteredCoaches"
        :key="coach.id"
        :id="coach.id"
        :first-name="coach.firstName"
        :last-name="coach.lastName"
        :areas="coach.areas"
        :rate="coach.hourlyRate"
      >
        {{ coach.firstName }}
      </coach-item>
    </ul>
    <h3 v-else>No coaches found</h3>
  </base-card>
</div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem'
import CoachFilter from '../../components/coaches/CoachFilter'
export default {
  components:{
    CoachItem,
    CoachFilter
  },
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true
      },
      isLoading: false,
      error: null
    }
  },
  created() {
    this.loadCoaches()
  },
  mounted()
   {
    this.$store.getters['coaches/coaches']
  },  
  computed: {
    loggedIn () {
      return !!this.$store.getters.token
    },
    filteredCoaches () { 
      const coaches = this.$store.getters['coaches/coaches']
      return coaches.filter(coach => {
        if(this.filters.frontend && coach.areas.includes('frontend')) return true
        if(this.filters.backend && coach.areas.includes('backend')) return true
        if(this.filters.career && coach.areas.includes('career')) return true
        return false
      })
    },
    hasCoaches () {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches']
    },
    isCoach () {
      return this.$store.getters['coaches/isCoach']
    }
  },
  methods: {
    setFilters(updatedFilters) {
      this.filters = updatedFilters
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true
      try {
         await this.$store.dispatch('coaches/loadCoaches', {forceRefresh: refresh})
      } catch(err) {
        this.error = err.message || 'Something went wrong'
      }

      this.isLoading = false
    },
    handleError () {
      this.error = null
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>