import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { ColorSchemeUtil } from '@/utils/color-scheme-util'
import { darkTheme, lightTheme } from '@/plugins/vuetify/theme'
import Afrikaans from '@/i18n/afrikaans'
import English from '@/i18n/english'
import SimplifiedChinese from '@/i18n/simplified-chinese'

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: { Afrikaans, English, SimplifiedChinese },
    current: 'SimplifiedChinese'
  },
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
