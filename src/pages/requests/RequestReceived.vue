<template>
<div>
  <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
    <p>{{error}}</p>
  </base-dialog>
  <section>
    <base-card>
      <header>
        <h2>Requests received</h2>
      </header>
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
      <ul v-else-if="hasRequests">
        <request-item
          v-for="request in requests"
          :key="request.id"
          :message="request.message"
          :email="request.userEmail"
        ></request-item>
      </ul>
      <h3 v-else>You havent received any requests yet</h3>
    </base-card>
  </section>
</div>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem'
export default {
  components: {
    RequestItem
  },
  created() {
    this.loadRequests()
  },
  data() {
    return {
      isLoading: false,
      error: null
    }
  },
  computed: {
    requests() {
      return this.$store.getters['requests/requests']
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests']
    }
  },
  methods: {
     async loadRequests() {
       this.isLoading = true
       try{
         await this.$store.dispatch('requests/fetchRequests')
       } catch(err) {
         this.error = err.message || 'Something failed'
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
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>