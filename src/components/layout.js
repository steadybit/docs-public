/*
 * Copyright 2020 chaosmesh GmbH. All rights reserved.
 */

import {MDXProvider} from "@mdx-js/react";
import React from "react";
import mdxComponents from "./mdxComponents";
import Sidebar from "./sidebar";

const Layout = ({children, location}) => (
  <MDXProvider components={mdxComponents}>
    <Sidebar location={location}/>
    <main className={'content-wrapper'}>
      <div className={'dot-grid'}/>
      <article className={'content'}>
        {children}
      </article>
    </main>
  </MDXProvider>
);

export default Layout;
