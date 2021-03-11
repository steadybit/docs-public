/*
 * Copyright 2021 steadybit GmbH. All rights reserved.
 */

import React from "react";
import config from "../../../config";
import Link from "../link";
import { AnimatePresence, motion } from "framer-motion";
import iconChevronRight from "../../assets/images/icon-chevron-right.svg";
import iconChevronDown from "../../assets/images/icon-chevron-down.svg";

function getPathname(location) {
  return location.pathname.substr(-1) === "/"
    ? location.pathname.slice(0, -1)
    : location.pathname;
}

function isLocationActiveCanonical(location, url) {
  if (location && location.pathname) {
    return getPathname(location).includes(url);
  }
  return false;
}

const TreeNode = ({ className = "", url, title, items }) => {
  const hasChildren = items.length !== 0;
  const location =
    typeof document !== "undefined" ? document.location : undefined;
  const active =
    location &&
    (getPathname(location) === url ||
      location.pathname === config.gatsby.pathPrefix + url);
  const [isHiddenForced, setForceHidden] = React.useState(false);
  const isVisible = isLocationActiveCanonical(location, url) && !isHiddenForced;
  const calculatedClassName = `${className} item${active ? " active" : ""}`;
  return (
    <li className={calculatedClassName}>
      {title ? (
        <Link
          to={url}
          onClick={() => setForceHidden(active && !isHiddenForced)}
        >
          {title}
          {hasChildren ? (
            <img
              src={isVisible ? iconChevronDown : iconChevronRight}
              alt={isVisible ? "chevron down" : "chevron right"}
            />
          ) : null}
        </Link>
      ) : null}
      {hasChildren ? (
        <AnimatePresence initial={false}>
          {isVisible ? (
            <motion.div
              style={{ overflow: "hidden" }}
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              as={"ul"}
            >
              <ul style={{ display: isVisible ? "block" : "none" }}>
                {items.map((item) => (
                  <TreeNode key={item.url} {...item} />
                ))}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      ) : null}
    </li>
  );
};
export default TreeNode;
