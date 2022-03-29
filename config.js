/*
 * Copyright 2022 steadybit GmbH. All rights reserved.
 */

const config = {
  gatsby: {
    pathPrefix: "/docs",
    siteUrl: "https://docs.steadybit.io",
    gaTrackingId: "UA-145692204-1",
  },
  sidebar: {
    forcedNavOrder: [
      "getting-started",
      "install-configure",
      "use",
      "learn",
      "integrate",
    ],
    frontline: false,
    ignoreIndex: true,
    ignorePath: [
      "/getting-started/10-set-up-saas",
      "/getting-started/20-set-up-onprem",
      "/getting-started/30-run-experiment-local",
      "/getting-started/40-run-experiment-eks",
      "/install-configure/50-set-up-areas",
    ],
  },
  siteMetadata: {
    title: "steadybit Documentation",
    description: "steadybit Chaos Engineering Platform Documentation",
  },
};

module.exports = config;
