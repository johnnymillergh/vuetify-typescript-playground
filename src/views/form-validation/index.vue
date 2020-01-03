import validator from "validator"
<template>
  <v-container id="form-validation-container">
    <v-form ref="form" v-model="formValidation">
      <v-text-field label="Title" v-model="getDemoPayload.title" :rules="titleRules" clearable/>
      <v-text-field label="Text" v-model="getDemoPayload.text" :rules="textRules" clearable/>
      <v-text-field label="Rating" v-model="getDemoPayload.rating" :rules="ratingRules"/>
      <v-text-field label="Email" v-model="getDemoPayload.email" :rules="emailRules"/>
      <v-text-field label="Domain Name" v-model="getDemoPayload.site" :rules="siteRules"/>
      <v-btn v-debounced-click:300="handleDebouncedClickRendRequest" :loading="sendRequestLoading" small>Send request
      </v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { GetDemoPayload } from '@/requests/vuetify-demo/payload/get-demo-payload'
// eslint-disable-next-line no-unused-vars
import validator from 'validator'
// eslint-disable-next-line no-unused-vars
import { VForm } from '@/shims-tsx'
import { vuetifyDemoApi } from '@/requests/vuetify-demo'

export default Vue.extend({
  name: 'form-validation',
  computed: {
    form (): VForm {
      return this.$refs.form as VForm
    }
  },
  mounted () {
    this.getDemoPayload.title = 'Title Title Title'
    this.getDemoPayload.text = 'hello'
    this.getDemoPayload.rating = 2
    this.getDemoPayload.email = 'test@gmail.com'
  },
  data: () => ({
    formValidation: false,
    getDemoPayload: new GetDemoPayload(),
    titleRules: [
      (v: string) => !!v || 'Title is required.',
      (v: string) => {
        if (v && !validator.isLength(v, 10, 20)) {
          return 'The length of title must not be less than 10 characters and not be more than 20 characters!'
        }
        return true
      }
    ],
    textRules: [
      (v: string) => !!v || 'Test is required.',
      (v: string) => {
        if (v && !validator.contains('hello', v)) {
          return 'The text need to contain `hello`!'
        }
        return true
      }
    ],
    ratingRules: [
      (v: number) => !!v || 'Rating is required.',
      (v: number) => {
        if (v && (v < 0 || v > 10)) {
          return 'The value range of rating should be [0, 10]!'
        }
        return true
      }
    ],
    emailRules: [
      (v: string) => !!v || 'Email is required.',
      (v: string) => {
        if (v && !validator.isEmail(v)) {
          return 'Invalid email!'
        }
        return true
      }
    ],
    siteRules: [
      (v: string) => {
        if (v && !validator.isFQDN(v)) {
          return 'Invalid domain name!'
        }
        return true
      }
    ],
    sendRequestLoading: false
  }),
  methods: {
    async handleDebouncedClickRendRequest (event: Event) {
      console.info('handleDebouncedClickRendRequest', event)
      this.form.validate()
      if (!this.formValidation) {
        this.$toast.warning('The form is incorrect!')
        return
      }
      this.sendRequestLoading = true
      try {
        const response = await vuetifyDemoApi.getDemo(this.getDemoPayload)
        this.$toast.success(response.message)
      } catch (error) {
        console.error('Error occurred when sending request getDemo!', error)
        this.$toast.error('Error occurred when sending request getDemo!')
      } finally {
        this.sendRequestLoading = false
      }
    }
  }
})
</script>

<style lang="scss" scoped>
#form-validation-container {
}
</style>
