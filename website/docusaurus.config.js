/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Stook',
  tagline: 'A minimalist design state management library for React',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'forsigner', // Usually your GitHub org/user name.
  projectName: 'stook',
  themeConfig: {
    navbar: {
      title: 'Stook',
      items: [
        {
          type: 'doc',
          docId: 'stook/intro',
          position: 'left',
          label: 'Docs',
        },

        { to: '/ecosystem', label: 'Ecosystem', position: 'right' },

        {
          href: 'https://www.github.com/motere/stook',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {
              label: 'Quick Start',
              to: '/docs/stook/quick-start',
            },
            {
              label: 'Stook',
              to: '/docs/stook/intro',
            },
            {
              label: 'GraphQL',
              to: '/docs/graphql/intro',
            },
          ],
        },
        {
          title: '社区',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/stook',
            },
            {
              label: 'Feedback',
              to: 'https://github.com/motere/stook/issues',
            },
          ],
        },
        {
          title: '社交',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/motere/stook',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} forsigner.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}
