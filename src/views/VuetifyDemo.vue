<template>
  <div id="vuetify-demo-container">
    <h1 class="text-center">This is an about page</h1>
    <v-container>
      <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
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
        <v-chip>Default</v-chip>
        <v-chip close>Close</v-chip>
        <v-chip outlined>Outlined</v-chip>
        <v-chip v-model="value" filter>Filter</v-chip>
        <v-chip pill>
          <v-avatar left color="red">P</v-avatar>
          Pill
        </v-chip>
        <v-chip>
          <v-icon left color="red">mdi-account</v-icon>
          Icon
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
        <v-radio v-for="n in 3" :key="n" :label="`Radio ${n}`" :value="n"/>
      </v-radio-group>
      <v-container fluid>
        <v-switch v-model="darkModeSwitch" :label="`darkModeSwitch: ${darkModeSwitch.toString()}`"/>
      </v-container>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'VuetifyDemo',
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
    darkModeSwitch: true
  }),
  mounted () {
    this.onResize()
  },
  watch: {
    darkModeSwitch: {
      deep: true,
      handler (newDarkModeSwitch) {
        this.$vuetify.theme.dark = newDarkModeSwitch
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
