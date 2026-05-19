import type { Theme } from 'vitepress'
import type { Component } from 'vue'
import type { DefineLocaleMessage } from 'vue-i18n'

import { createI18n } from 'vue-i18n'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import './styles/style.css'
import './styles/theme-vitepress.css'
import './styles/theme-markdown.css'
import './styles/theme-media.css'
import './styles/theme-kbd.css'
import './styles/theme-animations.css'
import './styles/custom-nixie.css'
import '@fontsource-variable/quicksand/index.css'
import '@fontsource-variable/dm-sans/index.css'
import '@fontsource/dm-mono/index.css'
import '@fontsource/dm-serif-display/index.css'
import '@fontsource-variable/comfortaa/index.css'

export type { ButtonItem, Link, ThemeConfig } from './config'

/**
 * Options used to compose a VitePress theme for a concrete docs site.
 */
export interface CreateThemeOptions {
  /**
   * Site-owned layout component. This stays outside the shared package because it can depend on site content.
   */
  Layout: Theme['Layout']

  /**
   * Vue I18n message map installed into the VitePress app.
   */
  messages: Record<string, DefineLocaleMessage>

  /**
   * Components registered globally by the site.
   */
  components?: Record<string, Component>

  /**
   * Optional production-only analytics loader.
   */
  analytics?: () => Promise<unknown>
}

/**
 * Creates the shared Project AIRI VitePress theme.
 *
 * Use when:
 * - A docs site wants the shared Project AIRI VitePress styling and app setup.
 * - A docs site needs to keep its layout and content-specific components local.
 *
 * Expects:
 * - The caller passes a site-owned layout component.
 * - The caller passes locale messages keyed by VitePress language.
 *
 * Returns:
 * - A VitePress theme object ready to export from `.vitepress/theme/index.ts`.
 */
export function createTheme(options: CreateThemeOptions): Theme {
  return {
    Layout: options.Layout,
    enhanceApp({ app, siteData }) {
      if (!import.meta.env.SSR && import.meta.env.PROD && options.analytics) {
        options.analytics()
      }

      const i18n = createI18n({
        legacy: false,
        locale: siteData.value.lang || 'en',
        fallbackLocale: 'en',
        messages: options.messages,
      })

      app.use(i18n)

      for (const [name, component] of Object.entries(options.components ?? {})) {
        app.component(name, component)
      }
    },
  }
}
