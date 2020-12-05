<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">Firstname</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="firstName.val"
        @blur="clearError('firstName')"
      />
      <p v-if="!firstName.isValid" :class="{ invalid: !firstName.isValid }">
        Firstname must not be empty
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">Lastname</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="lastName.val"
        @blur="clearError('lastName')"
      />
      <p v-if="!lastName.isValid" :class="{ invalid: !lastName.isValid }">
        Lastname must not be empty
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        row="5"
        id="description"
        v-model.trim="description.val"
        @blur="clearError('description')"
      />
      <p v-if="!description.isValid" :class="{ invalid: !description.isValid }">
        Description must not be empty
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input
        type="number"
        id="rate"
        v-model.number="rate.val"
        @blur="clearError('rate')"
      />
      <p v-if="!rate.isValid" :class="{ invalid: !rate.isValid }">
        Rate must be greater than 0
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Areas of Expertise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          v-model="areas.val"
          value="frontend"
          @blur="clearError('areas')"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          v-model="areas.val"
          value="backend"
          @blur="clearError('areas')"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          v-model="areas.val"
          value="career"
          @blur="clearError('areas')"
        />
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="!areas.isValid" :class="{ invalid: !areas.isValid }">
        At least one expertise must be selected
      </p>
    </div>
    <p v-if="!formIsValid" :class="{ invalid: !formIsValid }">
      Please fix above errors and submit again
    </p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      firstName: {
        val: '',
        isValid: true
      },
      lastName: {
        val: '',
        isValid: true
      },
      description: {
        val: '',
        isValid: true
      },
      rate: {
        val: null,
        isValid: true
      },
      areas: {
        val: [],
        isValid: true
      },
      formIsValid: true
    }
  },
  methods: {
    clearError(input) {
      this[input].isValid = true
    },
    validateForm () {
      this.formIsValid = true
      if(this.firstName.val === '')  {
        this.firstName.isValid = false
        this.formIsValid = false
      }
        if(this.lastName.val === '')  {
        this.lastName.isValid = false
        this.formIsValid = false
      }
        if(this.description.val === '')  {
        this.description.isValid = false
        this.formIsValid = false
      }
        if(!this.rate.val || this.rate.val < 0)  {
        this.rate.isValid = false
        this.formIsValid = false
      }
        if(this.areas.val.length === 0)  {
        this.areas.isValid = false
        this.formIsValid = false
      }
    },
    submitForm () {
      this.validateForm()
      if(!this.formIsValid){
        return
      }
      const formData = {
        first: this.firstName.val,
        last: this.lastName.val,
        desc: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val
      }
      this.$emit('save-data', formData)
    }
  }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>