/*
 * Copyright 2021 steadybit GmbH. All rights reserved.
 */

import isAbsoluteUrl from "is-absolute-url";
import { Link as GatsbyLink } from "gatsby"
import React from "react";

const Link = ({ to, ...props }) =>
  isAbsoluteUrl(to) ? (
    <a href={to} {...props} />
  ) : (
    <GatsbyLink
      {...props}
      to={to}
      style={{ cursor: "pointer", ...(props.style ? props.style : {}) }}
    />
  );

export default Link;
