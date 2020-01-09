/*
 * Copyright 2020 chaosmesh GmbH. All rights reserved.
 */

import React from "react";
import config from '../../../config';
import Link from "../link";

const TreeNode = ({className = '', url, title, items}) => {
  const hasChildren = items.length !== 0;
  const location = typeof document !== 'undefined' ? document.location : undefined;
  const active = location && (location.pathname === url || location.pathname === (config.gatsby.pathPrefix + url));
  const calculatedClassName = `${className} item ${active ? 'active' : ''}`;
  return (
    <li className={calculatedClassName}>
      {title ? (<Link to={url}>{title}</Link>) : null}
      {hasChildren ? (
        <ul>
          {items.map((item) => (<TreeNode key={item.url} {...item} />))}
        </ul>
      ) : null}
    </li>
  );
};
export default TreeNode;
