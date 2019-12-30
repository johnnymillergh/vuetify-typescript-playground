<template>
  <v-app id="app-container">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain
               src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition"
               width="40"/>
        <span id="app-name">{{ appName }}</span>
        <span id="version">{{ version }}</span>
        <span id="environment">{{ environment }}</span>
      </div>
      <v-spacer/>
      <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-sheet class="text-center">
        <router-link to="/">Home</router-link>
        <span>|</span>
        <router-link to="/vuetify-demo">Vuetify Demo</router-link>
      </v-sheet>
      <transition name="fade-transform" mode="out-in">
        <router-view class="app-container"/>
      </transition>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { AppUtil } from '@/utils/app-util.ts'

export default Vue.extend({
  name: 'App',
  data: () => ({
    appName: '',
    version: '',
    environment: ''
  }),
  mounted (): void {
    this.appName = AppUtil.getName()
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word[0].toUpperCase() + word.substr(1).toLowerCase())
      .join(' ')
    this.version = AppUtil.getVersionInfo()
    this.environment = `Environment: ${process.env.NODE_ENV} (${process.env.VUE_APP_ENV})`
  }
})
</script>

<!--suppress CssUnusedSymbol -->
<style lang="scss" scoped>
.fade-transform-leave-active, .fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

#app-container {
  #app-name {
    font-size: 32px;
    font-weight: bold;
  }

  #version {
    text-align: right;
    font-size: 32px;
    position: relative;
    left: 8px;
  }

  #environment {
    text-align: right;
    font-size: 18px;
    position: relative;
    top: 4px;
    left: 16px;
  }
}
</style>
