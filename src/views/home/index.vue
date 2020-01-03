<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.text" link>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content @click="handleClickItem(item)">
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-subheader class="mt-4 grey--text text--darken-1">SUBSCRIPTIONS</v-subheader>
        <v-list>
          <v-list-item v-for="item in items2" :key="item.text" link>
            <v-list-item-avatar>
              <img :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`" alt="">
            </v-list-item-avatar>
            <v-list-item-title v-text="item.text"/>
          </v-list-item>
        </v-list>
        <v-list-item class="mt-4" link>
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-plus-circle-outline</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Browse Channels</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Manage Subscriptions</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left color="red" dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-icon class="mx-4">{{ icon.mdiYoutube }}</v-icon>
      <v-toolbar-title>
        <span class="title">{{ appName }}</span>
        <span id="version">{{ version }}</span>
        <span id="environment">{{ environment }}</span>
      </v-toolbar-title>
      <v-spacer/>
      <v-row align="center" style="max-width: 650px">
        <v-text-field :append-icon-cb="() => {}"
                      placeholder="Search..."
                      single-line
                      append-icon="search"
                      color="white"
                      hide-details/>
      </v-row>
    </v-app-bar>
    <v-content>
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key"/>
      </transition>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { AppUtil } from '@/utils/app-util'
import Vue from 'vue'
import { mdiYoutube } from '@mdi/js'

export default Vue.extend({
  props: {
    source: String
  },
  computed: {
    key (): string {
      return this.$route.path
    }
  },
  data: () => ({
    icon: {
      mdiYoutube
    },
    drawer: null,
    items: [
      { icon: 'subscriptions', text: 'Hello World', path: '/hello-world' },
      { icon: 'trending_up', text: 'Vuetify Demo', path: '/vuetify-demo' },
      { icon: 'history', text: 'Form Valiation', path: '/form-validation' },
      { icon: 'featured_play_list', text: 'Playlists', path: '' },
      { icon: 'watch_later', text: 'Watch Later', path: '' }
    ],
    items2: [
      { picture: 28, text: 'Joseph' },
      { picture: 38, text: 'Apple' },
      { picture: 48, text: 'Xbox Ahoy' },
      { picture: 58, text: 'Nokia' },
      { picture: 78, text: 'MKBHD' }
    ],
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
  },
  methods: {
    handleClickItem (item: any) {
      this.$router.push(item.path)
    }
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

#version {
  text-align: right;
  font-size: 20px;
  position: relative;
  left: 8px;
}

#environment {
  text-align: right;
  font-size: 12px;
  position: relative;
  left: 16px;
}
</style>
