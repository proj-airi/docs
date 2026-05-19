import type { DefineLocaleMessage } from 'vue-i18n'

import messages from '@proj-airi/i18n/locales'

import { createTheme } from '@proj-airi/vitepress-theme'

import ThemedVideo from '../components/ThemedVideo.vue'
import Layout from '../custom/Layout.vue'

export default createTheme({
  Layout,
  messages: messages as Record<string, DefineLocaleMessage>,
  components: {
    ThemedVideo,
  },
  analytics: () => import('../modules/posthog'),
})
