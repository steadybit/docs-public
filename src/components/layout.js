/*
 * Copyright 2020 steadybit GmbH. All rights reserved.
 */

import { MDXProvider } from "@mdx-js/react";
import React from "react";
import mdxComponents from "./mdxComponents";
import Sidebar from "./sidebar";
import Footer from "./footer";
import useHeap from '../utils/heap';

const Layout = ({ children, location }) => {
  useHeap();
  return (
    <MDXProvider components={mdxComponents}>
      <Sidebar location={location} />
      <main className={'content-wrapper'}>
        <article className={'content'}>{children}</article>
        <Footer />
      </main>
    </MDXProvider>
  );
};

export default Layout;
