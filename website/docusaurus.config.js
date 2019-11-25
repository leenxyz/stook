/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: 'Stook',
  tagline: 'Manage {store} in {hooks}',
  baseUrl: '/',
  url: 'https://stook.now.sh', // Your website URL
  favicon: 'img/favicon.png',
  projectName: 'stook.github.io',
  organizationName: 'forsigner',
  themeConfig: {
    image: 'img/logo.png',
    // gtag: {
    //   trackingID: "UA-141789564-1"
    // },
    // googleAnalytics: {
    //   trackingID: 'UA-141789564-1',
    // },
    // algolia: {
    //   apiKey: "47ecd3b21be71c5822571b9f59e52544",
    //   indexName: "docusaurus-2",
    //   algoliaOptions: {}
    // },
    navbar: {
      title: 'Stook',
      logo: {
        alt: 'Logo',
        src: '/img/logo.png',
      },
      links: [
        { to: '/docs/intro/quick-start', label: 'Docs', position: 'right' },
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
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/pea-team/pea/edit/master/website/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}
