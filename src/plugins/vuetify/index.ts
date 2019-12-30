import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { ColorSchemeUtil } from '@/utils/color-scheme-util'
import { darkTheme, lightTheme } from '@/plugins/vuetify/theme'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: ColorSchemeUtil.isDarkMode(),
    options: {
      customProperties: true
    },
    themes: {
      dark: darkTheme,
      light: lightTheme
    }
  }
})
