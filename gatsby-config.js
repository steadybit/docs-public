/*
 * Copyright 2020 chaosmesh GmbH. All rights reserved.
 */

require("dotenv").config();
const queries = require("./src/utils/algolia");
const config = require("./config");
const plugins = [
  'gatsby-plugin-sitemap',
  'gatsby-plugin-sharp',
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `chaosmesh-docs`,
      short_name: `website`,
      start_url: `/`,
      background_color: `#ED220B`,
      theme_color: `#ED220B`,
      display: `standalone`,
      icon: `src/assets/images/logo.svg`
    },
  },
  {
    resolve: `gatsby-plugin-layout`,
    options: {
      component: require.resolve(`./src/templates/docs.js`)
    }
  },
  'gatsby-plugin-styled-components',
  {
    resolve: 'gatsby-plugin-mdx',
    options: {
      gatsbyRemarkPlugins: [
        {
          resolve: "gatsby-remark-images",
          options: {
            backgroundColor: "transparent",
            disableBgImageOnAlpha: true
          }
        },
        'gatsby-remark-copy-linked-files',
      ],
      extensions: [".mdx", ".md"]
    }
  },
  'gatsby-plugin-emotion',
  'gatsby-plugin-remove-trailing-slashes',
  'gatsby-plugin-react-helmet',
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "docs",
      path: `${__dirname}/content/`
    }
  },
  {
    resolve: `gatsby-plugin-gtag`,
    options: {
      // your google analytics tracking id
      trackingId: config.gatsby.gaTrackingId,
      // Puts tracking script in the head instead of the body
      head: true,
      // enable ip anonymization
      anonymize: false,
    },
  },
];
if (config.header.search && config.header.search.enabled && config.header.search.algoliaAppId && config.header.search.algoliaAdminKey) {
  plugins.push({
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: config.header.search.algoliaAppId, // algolia application id
        apiKey: config.header.search.algoliaAdminKey, // algolia admin key to index
        queries,
        chunkSize: 10000, // default: 1000
      }
    }
  );
}
module.exports = {
  pathPrefix: config.gatsby.pathPrefix,
  siteMetadata: {
    title: config.siteMetadata.title,
    description: config.siteMetadata.description,
    ogImage: config.siteMetadata.ogImage,
    favicon: config.siteMetadata.favicon,
    logo: {link: config.header.logoLink ? config.header.logoLink : '/', image: config.header.logo}, // backwards compatible
    headerTitle: config.header.title,
    headerLinks: config.header.links,
    siteUrl: config.gatsby.siteUrl,
  },
  plugins: plugins
};
