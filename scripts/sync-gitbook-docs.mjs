import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const docsDir = path.join(rootDir, 'docs')
const generatedDir = path.join(docsDir, '.vitepress', 'generated')

const BASE_URL = 'https://build.staratlas.com'
const SITEMAP_URL = `${BASE_URL}/sitemap-pages.xml`
const USER_AGENT = 'Mozilla/5.0 (compatible; StarAtlasDocsSync/1.0; +https://build.staratlas.com)'

const GROUP_LABELS = {
  introduction: 'Introduction',
  'creative-assets': 'Creative Assets',
  'dev-resources': 'Dev Resources',
  legal: 'Legal'
}

const SECTION_LINKS = {
  introduction: '/introduction/what-is-star-atlas',
  'creative-assets': '/creative-assets/building-with-star-atlas-creative-ip',
  'dev-resources': '/dev-resources/approach-and-philosophy',
  legal: '/legal/terms-of-service'
}

const SECTION_PREFIXES = ['/introduction/', '/creative-assets/', '/dev-resources/', '/legal/']

const REDIRECTS = [
  {
    alias: '/creative-assets/building-with-star-atlas-creative-ip/royalties',
    target: '/creative-assets/royalties',
    title: 'Redirecting to Royalties'
  }
]

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      'user-agent': USER_AGENT,
      accept: 'text/markdown,text/plain,text/html,application/xml;q=0.9,*/*;q=0.8'
    }
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`)
  }

  return await response.text()
}

function extractUrlsFromSitemap(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].trim())
}

function normalizeDocPath(url) {
  const parsed = new URL(url)
  if (parsed.origin !== BASE_URL) return null
  let pathname = parsed.pathname || '/'
  if (pathname !== '/' && pathname.endsWith('/')) pathname = pathname.slice(0, -1)
  return pathname
}

function outputFileForPath(pathname) {
  if (pathname === '/') return path.join(docsDir, 'index.md')
  return path.join(docsDir, `${pathname}.md`)
}

function titleFromContent(markdown, pathname) {
  const match = markdown.match(/^#\s+(.+)$/m)
  if (match) return match[1].trim()
  const fallback = pathname.split('/').filter(Boolean).at(-1) || 'Home'
  return fallback
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function rewriteInternalLinks(markdown) {
  const rewriteUrl = (raw) => {
    try {
      const url = new URL(raw)
      if (url.origin !== BASE_URL) return raw
      if (url.pathname.startsWith('/~gitbook/')) return raw
      let pathname = url.pathname || '/'
      if (pathname !== '/' && pathname.endsWith('/')) pathname = pathname.slice(0, -1)
      pathname = pathname.replace(/\.md$/, '') || '/'
      return `${pathname}${url.search}${url.hash}`
    } catch {
      return raw
    }
  }

  return markdown
    .replace(/\]\((https:\/\/build\.staratlas\.com[^)\s]*)\)/g, (_, url) => `](${rewriteUrl(url)})`)
    .replace(/href="(https:\/\/build\.staratlas\.com[^"]*)"/g, (_, url) => `href="${rewriteUrl(url)}"`)
    .replace(/<https:\/\/build\.staratlas\.com[^>]*>/g, (url) => `<${rewriteUrl(url.slice(1, -1))}>`)
    .replace(/[\u2028\u2029]/g, '\n')
    .replace(/\u00a0/g, ' ')
}

function convertGitBookSyntax(markdown) {
  return markdown
    .replace(/\{% hint style="([^"]+)" %\}/g, (_, style) => `::: ${style}`)
    .replace(/\{% endhint %\}/g, ':::')
    .replace(/\{% embed url="<([^>]+)>" %\}/g, (_, url) => `**Reference:** <${url}>`)
    .replace(/\{% tabs %\}\n?/g, '')
    .replace(/\{% endtabs %\}\n?/g, '')
    .replace(/\{% tab title="([^"]+)" %\}/g, (_, title) => `\n#### ${title}\n`)
    .replace(/\{% endtab %\}/g, '')
}

function postProcessMarkdown(pathname, markdown) {
  let processed = convertGitBookSyntax(markdown)

  if (pathname === '/developer-rpc-initiative') {
    processed = processed
      .replace('What the program provides', '## What the program provides')
      .replace(
        '* **Example code** in the open-source cookbook ([github.com/staratlasmeta/star-atlas-cookbook](https://github.com/staratlasmeta/star-atlas-cookbook)) community pull-requests are welcome',
        '* **Example code** in the open-source cookbook ([github.com/staratlasmeta/star-atlas-cookbook](https://github.com/staratlasmeta/star-atlas-cookbook)). Community pull requests are welcome.'
      )
      .replace('How to apply', '## How to apply')
      .replace(/2\. Fill out this short form[^\n]*\n\s*1\. <https:\/\/forms\.gle\/oRfGsuc1ArPSj4NBA>/, '2. Fill out this short form: <https://forms.gle/oRfGsuc1ArPSj4NBA>')
      .replace('Our infra team will review and e-mail you the credentials.', 'Our infra team will review and email you the credentials.')
      .replace(/\[\*#\*.*?community-developers\]\(https:\/\/discord\.com\/channels\/789226204980707409\/1004095538544787547\) channel on Discord\\?/s, '[#community-developers Discord channel](https://discord.com/channels/789226204980707409/1004095538544787547).')
      .replace(').\nLet’s build together!', ').\n\nLet’s build together!')
  }

  return processed
    .replace(
      /\/creative-assets\/building-with-star-atlas-creative-ip\/royalties/g,
      '/creative-assets/royalties'
    )
    .replace(/https:\/\/staratlas\.com\/terms-of-service/g, 'https://experience.staratlas.com/terms-of-service')
    .replace(/https:\/\/staratlas\.com\/privacy-policy/g, 'https://experience.staratlas.com/privacy-policy')
}

function createNode(segment = '', fullPath = '/') {
  return {
    segment,
    fullPath,
    page: null,
    children: new Map(),
    order: Number.POSITIVE_INFINITY
  }
}

function insertNode(root, pathname, page) {
  const segments = pathname.split('/').filter(Boolean)
  let current = root

  for (const segment of segments) {
    const nextPath = current.fullPath === '/' ? `/${segment}` : `${current.fullPath}/${segment}`
    if (!current.children.has(segment)) {
      current.children.set(segment, createNode(segment, nextPath))
    }
    current = current.children.get(segment)
    current.order = Math.min(current.order, page.order)
  }

  current.page = page
  current.order = Math.min(current.order, page.order)
}

function sortNodes(nodes) {
  return [...nodes].sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order
    return a.segment.localeCompare(b.segment)
  })
}

function labelForNode(node) {
  if (node.page?.title) return node.page.title
  return GROUP_LABELS[node.segment] || node.segment
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function sidebarItemsForNode(node) {
  return sortNodes(node.children.values()).map((child) => {
    const items = sidebarItemsForNode(child)
    const text = labelForNode(child)

    if (child.page && items.length === 0) {
      return { text, link: child.page.route }
    }

    if (child.page) {
      return {
        text,
        link: child.page.route,
        collapsed: false,
        items
      }
    }

    return {
      text,
      collapsed: false,
      items
    }
  })
}

function buildNavigation(pages) {
  const root = createNode()
  for (const page of pages) insertNode(root, page.pathname, page)

  const sidebar = {
    '/': [
      {
        text: 'Get Started',
        items: [
          { text: 'Home', link: '/' },
          { text: 'Introduction', link: SECTION_LINKS.introduction },
          { text: 'Creative Assets', link: SECTION_LINKS['creative-assets'] },
          { text: 'Dev Resources', link: SECTION_LINKS['dev-resources'] },
          { text: 'Developer RPC Initiative', link: '/developer-rpc-initiative' },
          { text: 'Legal', link: SECTION_LINKS.legal }
        ]
      }
    ],
    '/developer-rpc-initiative': [
      {
        text: 'Developer RPC Initiative',
        items: [{ text: 'Overview', link: '/developer-rpc-initiative' }]
      }
    ]
  }

  for (const [segment, node] of root.children.entries()) {
    const prefix = `/${segment}/`
    if (!SECTION_PREFIXES.includes(prefix)) continue
    sidebar[prefix] = sidebarItemsForNode(node)
  }

  const nav = [
    { text: 'Home', link: '/' },
    { text: 'Introduction', link: SECTION_LINKS.introduction },
    { text: 'Creative Assets', link: SECTION_LINKS['creative-assets'] },
    { text: 'Dev Resources', link: SECTION_LINKS['dev-resources'] },
    { text: 'Developer RPC Initiative', link: '/developer-rpc-initiative' },
    { text: 'Legal', link: SECTION_LINKS.legal }
  ]

  return { nav, sidebar }
}

function serializeModule(name, value) {
  return `export const ${name} = ${JSON.stringify(value, null, 2)}\n`
}

async function removeImportedDocs() {
  const targets = [
    'introduction',
    'creative-assets',
    'dev-resources',
    'legal',
    'developer-rpc-initiative.md'
  ]

  await Promise.all(
    targets.map((target) => rm(path.join(docsDir, target), { recursive: true, force: true }))
  )
}

async function writeRedirectPages() {
  for (const { alias, target, title } of REDIRECTS) {
    const filePath = path.join(docsDir, 'public', alias.replace(/^\//, ''), 'index.html')
    const content = `<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <meta http-equiv="refresh" content="0; url=${target}">\n    <meta name="robots" content="noindex">\n    <title>${title}</title>\n  </head>\n  <body>\n    <p>Redirecting to <a href="${target}">${target}</a>...</p>\n    <script>window.location.replace(${JSON.stringify(target)} + window.location.search + window.location.hash)</script>\n  </body>\n</html>\n`
    await mkdir(path.dirname(filePath), { recursive: true })
    await writeFile(filePath, content, 'utf8')
  }
}

async function verifyGitBookSource() {
  const probePath = '/introduction/what-is-star-atlas'
  const markdownUrl = `${BASE_URL}${probePath}.md`
  const probeResponse = await fetch(markdownUrl, {
    headers: {
      'user-agent': USER_AGENT,
      accept: 'text/markdown,text/plain;q=0.9,text/html;q=0.8,*/*;q=0.7'
    }
  })

  if (!probeResponse.ok) {
    throw new Error(
      `Sync source check failed for ${markdownUrl}: ${probeResponse.status} ${probeResponse.statusText}. ` +
      'This sync script is intended for the legacy GitBook source and should not run against the GitHub Pages site.'
    )
  }

  const body = (await probeResponse.text()).trim()
  if (!body.startsWith('# ')) {
    throw new Error(
      `Sync source check failed for ${markdownUrl}. Expected GitBook markdown but received different content. ` +
      'If build.staratlas.com has already been cut over, do not run sync until the source URL is updated.'
    )
  }
}

async function main() {
  await mkdir(generatedDir, { recursive: true })
  await verifyGitBookSource()
  await removeImportedDocs()

  const sitemap = await fetchText(SITEMAP_URL)
  const sitemapUrls = extractUrlsFromSitemap(sitemap)

  const pages = []

  for (const [order, url] of sitemapUrls.entries()) {
    const pathname = normalizeDocPath(url)
    if (!pathname || pathname === '/') continue

    const markdownUrl = `${BASE_URL}${pathname}.md`
    const rawMarkdown = await fetchText(markdownUrl)
    const markdown = postProcessMarkdown(pathname, rewriteInternalLinks(rawMarkdown)).trimEnd() + '\n'
    const filePath = outputFileForPath(pathname)

    await mkdir(path.dirname(filePath), { recursive: true })
    await writeFile(filePath, markdown, 'utf8')

    pages.push({
      order,
      pathname,
      route: pathname,
      title: titleFromContent(markdown, pathname),
      filePath: path.relative(rootDir, filePath)
    })
  }

  const { nav, sidebar } = buildNavigation(pages)
  const navigationModule = `${serializeModule('nav', nav)}\n${serializeModule('sidebar', sidebar)}`

  await writeRedirectPages()
  await writeFile(path.join(generatedDir, 'navigation.mjs'), navigationModule, 'utf8')
  await writeFile(path.join(generatedDir, 'pages.json'), JSON.stringify(pages, null, 2) + '\n', 'utf8')

  const existingReadme = await readFile(path.join(rootDir, 'README.md'), 'utf8')
  if (!existingReadme.includes('Imported markdown docs from the public GitBook sitemap')) {
    throw new Error('Unexpected README format, refusing to continue silently.')
  }

  console.log(`Synced ${pages.length} markdown pages from ${SITEMAP_URL}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
