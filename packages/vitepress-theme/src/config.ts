import type { DefaultTheme } from 'vitepress'

/**
 * Extra site-level theme options consumed by the Project AIRI docs theme.
 */
interface ExtraThemeConfig {
  /**
   * Homepage call-to-action buttons rendered by the custom home layout.
   */
  homepage: HomePageConfig
}

/**
 * Homepage configuration for the Project AIRI VitePress theme.
 */
interface HomePageConfig {
  /**
   * Ordered homepage action links.
   */
  buttons: ButtonItem[]
}

/**
 * Button-shaped homepage link configuration.
 */
export interface ButtonItem extends Link {
  /**
   * Whether the button should use the primary visual treatment.
   *
   * @default false
   */
  primary?: boolean
}

/**
 * Link data used by theme navigation and homepage controls.
 */
export interface Link {
  /**
   * Visible link label.
   */
  text?: string

  /**
   * Target URL or VitePress route.
   */
  link?: string

  /**
   * Native anchor target. Use `_self` for external links that VitePress should not intercept.
   */
  target?: string
}

export type ThemeConfig = DefaultTheme.Config & ExtraThemeConfig
