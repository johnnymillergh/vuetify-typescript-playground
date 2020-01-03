<template>
  <div id="vuetify-demo-container">
    <h1 class="text-center">This is an about page</h1>
    <v-container>
      <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover v-ripple>
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-sheet :color="colors[i]" height="100%">
            <v-row class="fill-height" align="center" justify="center">
              <div class="display-3">{{ slide }} Slide</div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <v-row v-resize="onResize" align="center" justify="center">
        <v-subheader>Window Size</v-subheader>
        {{ windowSize }}
      </v-row>
      <v-row id="chip-container" justify="center">
        <v-chip>{{ $vuetify.lang.t('$vuetify.chip.default') }}</v-chip>
        <v-chip close>{{ $vuetify.lang.t('$vuetify.chip.close') }}</v-chip>
        <v-chip outlined>{{ $vuetify.lang.t('$vuetify.chip.outlined') }}</v-chip>
        <v-chip v-model="value" filter>{{ $vuetify.lang.t('$vuetify.chip.filter') }}</v-chip>
        <v-chip pill>
          <v-avatar left color="red">P</v-avatar>
          {{ $vuetify.lang.t('$vuetify.chip.avatar') }}
        </v-chip>
        <v-chip>
          <v-icon left color="red">mdi-account</v-icon>
          {{ $vuetify.lang.t('$vuetify.chip.icon') }}
        </v-chip>
      </v-row>
      <v-card id="card-container" class="mx-auto" max-width="344" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">OVERLINE</div>
            <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
            <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-avatar tile size="80" color="grey"/>
        </v-list-item>
        <v-card-actions>
          <v-btn text v-throttled-click:2000="handleThrottledClickButton">Throttle</v-btn>
          <v-btn text v-debounced-click:2000="handleDebouncedClickButton">Debounce</v-btn>
        </v-card-actions>
      </v-card>
      <v-row align="center">
        <v-col class="text-center" cols="12" sm="4">
          <div class="my-2">
            <v-btn small>Normal</v-btn>
          </div>
          <div class="my-2">
            <v-btn small color="primary">Primary</v-btn>
          </div>
          <div class="my-2">
            <v-btn small color="error">Error</v-btn>
          </div>
          <div class="my-2">
            <v-btn small disabled>Disabled</v-btn>
          </div>
        </v-col>
        <v-col class="text-center" cols="12" sm="4">
          <div class="my-2">
            <v-btn>Normal</v-btn>
          </div>
          <div class="my-2">
            <v-btn color="primary">Primary</v-btn>
          </div>
          <div class="my-2">
            <v-btn color="error">Error</v-btn>
          </div>
          <div class="my-2">
            <v-btn disabled>Disabled</v-btn>
          </div>
        </v-col>
        <v-col class="text-center" cols="12" sm="4">
          <div class="my-2">
            <v-btn large>Normal</v-btn>
          </div>
          <div class="my-2">
            <v-btn large color="primary">Primary</v-btn>
          </div>
          <div class="my-2">
            <v-btn large color="error">Error</v-btn>
          </div>
          <div class="my-2">
            <v-btn large disabled>Disabled</v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row justify="space-around">
        <v-icon>mdi-anchor</v-icon>
        <v-icon>mdi-xbox-controller</v-icon>
        <v-icon>mdi-watch</v-icon>
        <v-icon>mdi-tilde</v-icon>
        <v-icon>mdi-tennis</v-icon>
        <v-icon>mdi-mouse</v-icon>
      </v-row>
      <v-row align="center">
        <v-col>
          <v-skeleton-loader :loading="loading" class="mx-auto" max-width="300" type="list-item-two-line">
            <v-card>
              <v-card-title>Title</v-card-title>
              <v-card-text>Card Text</v-card-text>
            </v-card>
          </v-skeleton-loader>
        </v-col>
        <v-col>
          <v-btn @click="handleClickStopLoading" large color="primary">Change</v-btn>
        </v-col>
      </v-row>
      <v-radio-group v-model="radioGroup">
        <v-radio label="Afrikaans" value="Afrikaans"/>
        <v-radio label="English" value="English"/>
        <v-radio label="Simplified Chinese" value="SimplifiedChinese"/>
      </v-radio-group>
      <v-container fluid>
        <v-switch v-model="darkModeSwitch" :label="`darkModeSwitch: ${darkModeSwitch.toString()}`"/>
      </v-container>
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { vuetifyDemoApi } from '@/requests/vuetify-demo'
// eslint-disable-next-line no-unused-vars
import { GetDemoPayload } from '@/requests/vuetify-demo/payload/get-demo-payload'
import validator from 'validator'
// eslint-disable-next-line no-unused-vars
import { VForm } from '@/shims-tsx'

export default Vue.extend({
  name: 'VuetifyDemo',
  computed: {
    form (): VForm {
      return this.$refs.form as VForm
    }
  },
  data: () => ({
    colors: ['indigo', 'warning', 'pink darken-2', 'red lighten-1', 'deep-purple accent-4'],
    slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
    windowSize: {
      x: 0,
      y: 0
    },
    value: true,
    loading: false,
    radioGroup: undefined,
    darkModeSwitch: true,
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
  mounted () {
    this.onResize()
    this.getDemoPayload.title = 'Title Title Title'
    this.getDemoPayload.text = 'hello'
    this.getDemoPayload.rating = 2
    this.getDemoPayload.email = 'test@gmail.com'
  },
  watch: {
    darkModeSwitch: {
      deep: true,
      handler (newDarkModeSwitch) {
        this.$vuetify.theme.dark = newDarkModeSwitch
      }
    },
    radioGroup: {
      deep: true,
      handler (newRadioGroup) {
        this.$vuetify.lang.current = newRadioGroup
      }
    }
  },
  methods: {
    handleThrottledClickButton (event: Event) {
      console.info('handleThrottledClickButton', event)
    },
    handleDebouncedClickButton (event: Event) {
      console.info('handleDebouncedClickButton', event)
    },
    async handleDebouncedClickRendRequest (event: Event) {
      console.info('handleDebouncedClickRendRequest', event)
      this.form.validate()
      if (!this.formValidation) {
        this.$toast.warning('The form is incorrect!')
        return
      }
      this.sendRequestLoading = true
      const response = await vuetifyDemoApi.getDemo(this.getDemoPayload)
      this.$toast.success(response.message)
      setTimeout(() => {
        this.sendRequestLoading = false
      }, 2000)
    },
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },
    handleClickStopLoading () {
      this.loading = !this.loading
    }
  }
})
</script>

<style lang="scss" scoped>
#vuetify-demo-container {
  #chip-container {
    margin-top: 24px;
  }

  #card-container {
    margin-top: 24px;
  }
}
</style>
