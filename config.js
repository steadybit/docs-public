/*
 * Copyright 2021 steadybit GmbH. All rights reserved.
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
    "forcedNavOrder": ['architecture', 'experiments', 'attacks', 'discovery', 'execution-monitoring', 'areas', 'teams-and-users', 'integration', 'installation-agent', 'installation-platform', 'release-notes'],
    "frontline": false,
    "ignoreIndex": true,
  },
  "siteMetadata": {
    "title": "steadybit Documentation",
    "description": "steadybit Chaos Engineering Platform Documentation"
  },
};

module.exports = config;
