/*
 * Copyright 2021 steadybit GmbH. All rights reserved.
 */

const config = {
  gatsby: {
    pathPrefix: "",
    siteUrl: "https://docs.steadybit.io",
    gaTrackingId: "UA-145692204-1",
  },
  sidebar: {
    forcedNavOrder: [
      "setup-configure",
      "use",
      "learn",
      "integrate",
      "release-notes",
    ],
    forcedSubNavOrder: {
      "setup-configure": ["configure-monitoring", "areas"],
      use: [],
      learn: [],
      integrate: [],
    },
    frontline: false,
    ignoreIndex: true,
  },
  siteMetadata: {
    title: "steadybit Documentation",
    description: "steadybit Chaos Engineering Platform Documentation",
  },
};

module.exports = config;
