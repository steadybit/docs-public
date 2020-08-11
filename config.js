/*
 * Copyright 2020 steadybit GmbH. All rights reserved.
 */

const config = {
  "gatsby": {
    "pathPrefix": "",
    "siteUrl": "https://docs.steadybit.com",
    "gaTrackingId": "UA-145692204-1"
  },
  "header": {
    "search": {
      "enabled": false,
      "indexName": "",
      "algoliaAppId": process.env.GATSBY_ALGOLIA_APP_ID,
      "algoliaSearchKey": process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      "algoliaAdminKey": process.env.ALGOLIA_ADMIN_KEY
    }
  },
  "sidebar": {
    "forcedNavOrder": ['experiments', 'attacks', 'discovery','steady-state', 'teams-and-users', 'architecture', 'integration', 'installation-agent', 'installation-platform', 'changelog'],
    "frontline": false,
    "ignoreIndex": true,
  },
  "siteMetadata": {
    "title": "steadybit Documentation",
    "description": "steadybit Chaos Engineering Platform Documentation"
  },
};

module.exports = config;
