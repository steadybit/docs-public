/*
 * Copyright 2021 steadybit GmbH. All rights reserved.
 */

const config = {
  "gatsby": {
    "pathPrefix": "",
    "siteUrl": "https://docs.steadybit.io",
    "gaTrackingId": "UA-145692204-1"
  },
  "sidebar": {
    "forcedNavOrder": ['experiments', 'attacks', 'discovery', 'execution-monitoring', 'areas', 'teams-and-users', 'integration', 'architecture', 'installation-agent', 'installation-platform', 'release-notes'],
    "frontline": false,
    "ignoreIndex": true,
  },
  "siteMetadata": {
    "title": "steadybit Documentation",
    "description": "steadybit Chaos Engineering Platform Documentation"
  },
};

module.exports = config;
