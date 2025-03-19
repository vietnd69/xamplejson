const config = {
  title: 'Island Adventures Documentation',
  tagline: 'Documentation for Island Adventures mod',
  favicon: 'img/favicon.ico',
  url: 'https://vietnd69.github.io',
  baseUrl: '/xamplejson/',
  organizationName: 'vietnd69',
  projectName: 'xamplejson',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'ignore',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'Island Adventures',
      logo: {
        alt: 'Island Adventures Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          href: 'https://github.com/vietnd69/xamplejson',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Island Adventures. Built with Docusaurus.`,
    },
    prism: {
      theme: require('prism-react-renderer').themes.github,
      darkTheme: require('prism-react-renderer').themes.dracula,
    },
  },
};

module.exports = config; 