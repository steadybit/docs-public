const config = {
  "gatsby": {
    "pathPrefix": "",
    "siteUrl": "https://docs.chaosmesh.com",
    "gaTrackingId": "UA-145692204-1"
  },
  "header": {
    "logo": "",
    "logoLink": "https://chaosmesh.com",
    "title": "",
    "links": [
      {"text": "", "link": ""}
    ],
    "search": {
      "enabled": false,
      "indexName": "",
      "algoliaAppId": process.env.GATSBY_ALGOLIA_APP_ID,
      "algoliaSearchKey": process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      "algoliaAdminKey": process.env.ALGOLIA_ADMIN_KEY
    }
  },
  "sidebar": {
    "forcedNavOrder": ['experiments', 'attacks', 'discovery', 'teams-and-users', 'architecture', 'installation-agent', 'installation-platform', 'changelog'],
    "links": [],
    "frontline": false,
    "ignoreIndex": true,
  },
  "siteMetadata": {
    "title": "chaosmesh Documentation",
    "description": "chaosmesh Chaos Engineering Platform Documentation",
    "ogImage": null,
    "favicon": null
  },
};

module.exports = config;
