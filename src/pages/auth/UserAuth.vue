<template>
<div>
  <base-dialog :show="!!error" title="An error occurred" @close="handleError">
    <p>{{error}}</p>
  </base-dialog>
  <base-dialog :show="isLoading" title="Authenticating..." fixed>
  <base-spinner></base-spinner>
  </base-dialog>
  <base-card>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">E-mail</label>
        <input v-model.trim="email" id="email" type="email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input v-model.trim="password" id="password" type="password" />
      </div>
      <p v-if="!formIsValid">Please enter a valid email and password (must be at least 6 characters long)</p>
      <base-button>{{submitBtnCaption}}</base-button>
      <base-button type="button" maode="flat" @click="switchAuthMode">{{switchModeBtnCaption}}</base-button>
    </form>
  </base-card>
</div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null
    }
  },
  computed: {
    submitBtnCaption() {
      return this.mode === 'login' ? 'Login' : 'Signup'
    },
    switchModeBtnCaption () {
      return this.mode === 'login' ? 'Signup instead' : 'Login instead'
    }
  },
  methods: {
      async submitForm() {
      this.formIsValid = true
      if(this.password.length < 6  || !(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/).test(this.email)) {
      this.formIsValid = false;
      return
      }
      this.isLoading = true
      const actionPayload = {email: this.email, password: this.password}
      try {
        if(this.mode === 'login') {
          await this.$store.dispatch('login', actionPayload)
        } else {
          await this.$store.dispatch('signup', actionPayload)
        }
        const redirectUrl = '/' + (this.$route.query.redirect || 'coaches')
        this.$router.replace(redirectUrl)
      } catch (err) {
        this.error = err.message || 'Failed to authenticate user. Try again later'
      }
      this.isLoading = false

    },
    switchAuthMode () {
      return this.mode === 'login' ? this.mode = 'signup' : this.mode = 'login'
    },
    handleError () {
      this.error = null;
    }
  }
}
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
