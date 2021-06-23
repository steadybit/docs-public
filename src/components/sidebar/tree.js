/*
 * Copyright 2021 steadybit GmbH. All rights reserved.
 */

import React, { useState } from "react";
import config from "../../../config";
import TreeNode from "./treeNode";

const sortChildItems = (item) => {
  item.items = item.items.sort(function (a, b) {
    if (a.label < b.label) return -1;
    if (a.label > b.label) return 1;
    return 0;
  });
  item.items.map(sortChildItems);
};
const calculateTreeData = (edges) => {
  const navData = config.sidebar.ignoreIndex
    ? edges.filter(
        ({
          node: {
            fields: { slug },
          },
        }) => slug !== "/"
      )
    : edges;
  const originalData = config.sidebar.ignorePath
    ? navData.filter(
        ({
          node: {
            fields: { slug },
          },
        }) => !config.sidebar.ignorePath.some((item) => item === slug)
      )
    : navData;
  const tree = originalData.reduce(
    (
      accu,
      {
        node: {
          fields: { slug, title },
          frontmatter: { navTitle },
        },
      }
    ) => {
      const parts = slug.split("/");
      let { items: prevItems } = accu;
      for (const part of parts.slice(1, -1)) {
        let tmp = prevItems.find(({ label }) => label === part);
        if (tmp) {
          if (!tmp.items) {
            tmp.items = [];
          }
        } else {
          tmp = { label: part, items: [] };
          prevItems.push(tmp);
        }
        prevItems = tmp.items;
      }
      const existingItem = prevItems.find(
        ({ label }) => label === parts[parts.length - 1]
      );
      if (existingItem) {
        existingItem.url = slug;
        existingItem.title = navTitle || title;
      } else {
        prevItems.push({
          label: parts[parts.length - 1],
          url: slug,
          items: [],
          title: navTitle || title,
        });
      }
      return accu;
    },
    { items: [] }
  );
  const {
    sidebar: { forcedNavOrder = [] },
  } = config;
  const reversedNavOrder = [...forcedNavOrder];
  reversedNavOrder.reverse();
  return reversedNavOrder.reduce((accu, slug) => {
    const parts = slug.split("/");
    let { items: prevItems } = accu;
    for (const part of parts.slice(1, -1)) {
      let tmp = prevItems.find(({ label }) => label === part);
      if (tmp) {
        if (!tmp.items) {
          tmp.items = [];
        }
      } else {
        tmp = { label: part, items: [] };
        prevItems.push(tmp);
      }
      prevItems = tmp.items;
    }
    // sort items alphabetically.
    prevItems.map(sortChildItems);
    const index = prevItems.findIndex(
      ({ label }) => label === parts[parts.length - 1]
    );
    accu.items.unshift(prevItems.splice(index, 1)[0]);
    return accu;
  }, tree);
};

const Tree = ({ edges }) => {
  const [rootNode] = useState(() => calculateTreeData(edges));
  return rootNode.items.map((item) => <TreeNode key={item.url} {...item} />);
};

export default Tree;
