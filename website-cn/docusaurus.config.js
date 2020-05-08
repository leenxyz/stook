module.exports = {
  title: 'Stook',
  tagline: 'A minimalist design state management library for React',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  url: 'https://stook-cn.now.sh', // Your website URL
  favicon: 'img/favicon.ico',
  organizationName: 'forsigner', // Usually your GitHub org/user name.
  projectName: 'stook.github.io',
  themeConfig: {
    image: 'img/logo.png',
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
    },
    navbar: {
      title: 'Stook',
      logo: {
        alt: 'Logo',
        src: '/img/logo.png',
      },
      links: [
        { to: '/docs/stook/quick-start', label: 'Docs', position: 'right' },
        { to: '/ecosystem', label: 'Ecosystem', position: 'right' },
        {
          href: 'https://www.github.com/forsigner/stook',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Quick Start',
              to: '/docs/intro/quick-start',
            },
            {
              label: 'Controller',
              to: '/docs/basic/controller',
            },
            {
              label: 'GraphQL',
              to: '/docs/basic/graphql',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/stook',
            },
            {
              label: 'Feedback',
              to: 'https://github.com/forsigner/stook/issues',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/forsigner/stook',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} forsigner.`,
    },
  },
  themes: ['@docusaurus/theme-live-codeblock'],

  plugins: [
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1030, // max resized image's size.
        min: 640, // min resized image's size. if original is lower, use that size.
        steps: 2, // the max number of images generated between min and max (inclusive)
      },
    ],
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/',
          remarkPlugins: [require('./src/plugins/remark-npm2yarn')],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}
