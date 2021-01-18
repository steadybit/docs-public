/*
 * Copyright 2021 steadybit GmbH. All rights reserved.
 */

require("dotenv").config();
const config = require("./config");
const plugins = [
  'gatsby-plugin-sitemap',
  'gatsby-plugin-sharp',
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `steadybit-docs`,
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
  {
    resolve: 'gatsby-plugin-mdx',
    options: {
      gatsbyRemarkPlugins: [
        {
          resolve: "gatsby-remark-images",
          options: {
            wrapperStyle: "margin-left: 0; margin-right: 0;",
            backgroundColor: "transparent",
            disableBgImageOnAlpha: true
          }
        },
        'gatsby-remark-copy-linked-files',
      ],
      extensions: [".mdx", ".md"]
    }
  },
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

module.exports = {
  pathPrefix: config.gatsby.pathPrefix,
  siteMetadata: {
    title: config.siteMetadata.title,
    description: config.siteMetadata.description,
    ogImage: config.siteMetadata.ogImage,
    favicon: config.siteMetadata.favicon,
    siteUrl: config.gatsby.siteUrl,
  },
  plugins: plugins
};
