module.exports = {
  lessonsDir: 'lessons', // The name of the directory that contains lessons or docs.
  siteTitle: 'docs', // Site title.
  siteTitleAlt: 'chaosmesh docs', // Alternative site title for SEO.
  siteLogo: '/logos/logo-1024.png', // Logo used for SEO and manifest.
  siteUrl: 'https://chaosmesh.com', // Domain of your website without pathPrefix.
  pathPrefix: '/', // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: 'The Documentation for the chaosmesh platform.', // Website description used for RSS feeds/meta description tag.
  siteRss: '/rss.xml', // Path to the RSS file.
  googleAnalyticsID: 'UA-145692204-1', // GA tracking ID.
  userName: 'User', // Username to display in the author segment.
  userTwitter: 'chaosmesh', // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: 'Solingen, Germany', // User location to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: 'GitHub',
      url: 'https://github.com/chaosmesh',
      iconClassName: 'fa fa-github'
    },
    {
      label: 'Twitter',
      url: 'https://twitter.com/chaosmesh',
      iconClassName: 'fa fa-twitter'
    },
    {
      label: 'Email',
      url: 'mailto:info@chaosmesh.com',
      iconClassName: 'fa fa-envelope'
    }
  ],
  copyright: 'Copyright © 2019.', // Copyright string for the footer of the website and RSS feed.
  themeColor: '#c62828', // Used for setting manifest and progress theme colors.
  backgroundColor: '#e0e0e0', // Used for setting manifest background color.
  // TODO: Move this literally anywhere better.
  toCChapters: ['', 'Chapter 1', 'Chapter 2'] // Used to generate the Table Of Contents. Index 0 should be blank.
}
