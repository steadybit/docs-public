/*
 * Copyright 2020 chaosmesh GmbH. All rights reserved.
 */

import Highlight, {defaultProps} from "prism-react-renderer";
import prismTheme from "prism-react-renderer/themes/github";
import * as React from "react";
import '../styles.css';

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

const CodeBlock = ({children, className}) => {
  const language = className ? className.replace(/language-/, '') : '';
  return (
    <Highlight {...defaultProps} language={language} code={children} theme={prismTheme}>
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <div className={className} style={{...style, 'background-color' : 'transparent'}}>
          {cleanTokens(tokens).map((line, i) => (
            <div key={i} {...getLineProps({line, key: i})}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({token, key})} />
              ))}
            </div>
          ))}
          </div>
      )}
    </Highlight>
  );
};

export default CodeBlock;
