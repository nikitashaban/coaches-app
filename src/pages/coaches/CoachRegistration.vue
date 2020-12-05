<template>
  <section>
    <base-card>
      <h2>Register as coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm'
export default {
  components: {
    CoachForm
  },
  methods: {
    saveData(data) {
      this.$store.dispatch('coaches/addCoach', data)
      this.$router.replace('/')
    }
  }
}
</script>