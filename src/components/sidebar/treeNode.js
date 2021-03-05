/*
 * Copyright 2021 steadybit GmbH. All rights reserved.
 */

import React from "react";
import config from "../../../config";
import Link from "../link";
import { AnimatePresence, motion } from "framer-motion";
import iconChevronRight from "../../assets/images/icon-chevron-right.svg";
import iconChevronDown from "../../assets/images/icon-chevron-down.svg";

const TreeNode = ({ className = "", url, title, items }) => {
  const [isHidden, setHidden] = React.useState(true);
  const hasChildren = items.length !== 0;
  const location =
    typeof document !== "undefined" ? document.location : undefined;
  const active =
    location &&
    (location.pathname === url ||
      location.pathname === config.gatsby.pathPrefix + url);
  const calculatedClassName = `${className} item ${active ? "active" : ""}`;
  return (
    <li className={calculatedClassName}>
      {title ? (
        <Link to={url} onClick={() => setHidden(!isHidden)}>
          {title}
          {hasChildren ? (
            <img
              src={isHidden ? iconChevronRight : iconChevronDown}
              alt={isHidden ? "chevron right" : "chevron down"}
            />
          ) : null}
        </Link>
      ) : null}
      {hasChildren ? (
        <AnimatePresence initial={false}>
          {!isHidden ? (
            <motion.div
              style={{ overflow: "hidden" }}
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              as={"ul"}
            >
              <ul style={{ display: isHidden ? "none" : "block" }}>
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
