/*
 * Copyright 2021 steadybit GmbH. All rights reserved.
 */

import Highlight, { defaultProps } from "prism-react-renderer";
// import prismTheme from "prism-react-renderer/themes/";
import * as React from "react";
import "../styles.css";

/** Removes the last token from a code example if it's empty. */
function cleanTokens(tokens) {
  const tokensLength = tokens.length;
  if (tokensLength === 0) {
    return tokens;
  }
  const lastToken = tokens[tokensLength - 1];
  if (lastToken.length === 1 && lastToken[0].empty) {
    return tokens.slice(0, tokensLength - 1);
  }
  return tokens;
}

const prismTheme = {
  plain: {
    color: "#131316",
    backgroundColor: "#f6f8fa",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#6c7581",
        fontStyle: "italic",
      },
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ["string", "attr-value"],
      style: {
        color: "#f94d4c",
      },
    },
    {
      types: ["punctuation", "operator"],
      style: {
        color: "#424a56",
      },
    },
    {
      types: [
        "entity",
        "url",
        "symbol",
        "number",
        "boolean",
        "variable",
        "constant",
        "property",
        "regex",
        "inserted",
      ],
      style: {
        color: "#00a4db",
      },
    },
    {
      types: ["atrule", "keyword", "attr-name", "selector"],
      style: {
        color: "#21B6AE",
      },
    },
    {
      types: ["function", "deleted", "tag"],
      style: {
        color: "#f94d4c",
      },
    },
    {
      types: ["function-variable"],
      style: {
        color: "#5b48ca",
      },
    },
    {
      types: ["tag", "selector", "keyword"],
      style: {
        color: "#0f054c",
      },
    },
  ],
};

const CodeBlock = ({ children, className }) => {
  const language = className ? className.replace(/language-/, "") : "";
  return (
    <Highlight
      {...defaultProps}
      language={language}
      code={children}
      theme={prismTheme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div
          className={className}
          style={{ ...style, backgroundColor: "transparent" }}
        >
          {cleanTokens(tokens).map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </div>
      )}
    </Highlight>
  );
};

export default CodeBlock;
