/*
 * Copyright 2021 steadybit GmbH. All rights reserved.
 */

import { navigate } from "gatsby";
import isAbsoluteUrl from "is-absolute-url";
import React from "react";

const Link = ({ to, ...props }) =>
  isAbsoluteUrl(to) ? (
    <a href={to} {...props} />
  ) : (
    <a
      {...props}
      href={to}
      style={{ cursor: "pointer", ...(props.style ? props.style : {}) }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (props.onClick) {
          props.onClick();
        }
        navigate(to);
      }}
    />
  );

export default Link;
