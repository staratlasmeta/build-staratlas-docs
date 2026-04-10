import { defineConfig } from 'vitepress'
import { nav, sidebar } from './generated/navigation.mjs'

export default defineConfig({
  lang: 'en-US',
  title: 'Star Atlas Build',
  description: 'Resources for builders creating with the Star Atlas ecosystem.',
  cleanUrls: true,
  lastUpdated: true,
  appearance: true,
  ignoreDeadLinks: [/^https?:\/\//],
  sitemap: {
    hostname: 'https://build.staratlas.com'
  },
  head: [
    ['meta', { name: 'theme-color', content: '#07111d' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Star Atlas Build' }],
    ['meta', { property: 'og:site_name', content: 'Star Atlas Build' }],
    ['meta', { property: 'og:description', content: 'Resources for builders creating with the Star Atlas ecosystem.' }],
    ['meta', { property: 'og:image', content: 'https://build.staratlas.com/images/star-atlas-build-hero.png' }],
    ['link', { rel: 'icon', href: '/images/star-atlas-build-icon.png' }],
    [
      'script',
      {},
      "try { if (!localStorage.getItem('vitepress-theme-appearance')) localStorage.setItem('vitepress-theme-appearance', 'dark') } catch (error) {}"
    ]
  ],
  themeConfig: {
    logo: '/images/star-atlas-build-logo.png',
    siteTitle: 'Star Atlas Build',
    nav,
    sidebar,
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'discord', link: 'https://discord.com/invite/staratlas' }
    ],
    outline: {
      level: [2, 3],
      label: 'On this page'
    },
    docFooter: {
      prev: 'Previous',
      next: 'Next'
    },
    lastUpdated: {
      text: 'Last updated'
    },
    footer: {
      message: 'Official builder docs for the Star Atlas ecosystem.',
      copyright: 'Star Atlas Build'
    }
  },
  vite: {
    server: {
      host: true
    }
  }
})
