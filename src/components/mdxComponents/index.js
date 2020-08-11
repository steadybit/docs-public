/*
 * Copyright 2020 steadybit GmbH. All rights reserved.
 */

import React from "react";
import AnchorTag from "./anchor";
import CodeBlock from "./codeBlock";

export default {
  h1: (props) => (
    <h1
      className="heading h1"
      id={props.children.replace(/\s+/g, "").toLowerCase()}
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="heading h2"
      id={props.children.replace(/\s+/g, "").toLowerCase()}
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="heading h3"
      id={props.children.replace(/\s+/g, "").toLowerCase()}
      {...props}
    />
  ),
  h4: (props) => (
    <h4
      className="heading h4"
      id={props.children.replace(/\s+/g, "").toLowerCase()}
      {...props}
    />
  ),
  h5: (props) => (
    <h5
      className="heading h5"
      id={props.children.replace(/\s+/g, "").toLowerCase()}
      {...props}
    />
  ),
  h6: (props) => (
    <h6
      className="heading h6"
      id={props.children.replace(/\s+/g, "").toLowerCase()}
      {...props}
    />
  ),
  p: (props) => <p className="paragraph" {...props} />,
  pre: (props) => <pre className="pre" {...props} />,
  table: (props) => (
    <div class="responsive-table">
      <table {...props} />
    </div>
  ),
  code: CodeBlock,
  a: AnchorTag,
  // TODO add `img`
  // TODO add `blockquote`
  // TODO add `ul`
  // TODO add `li`
  // TODO add `table`
};
