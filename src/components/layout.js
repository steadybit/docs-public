/*
 * Copyright 2020 chaosmesh GmbH. All rights reserved.
 */

import {MDXProvider} from "@mdx-js/react";
import React from "react";
import styled from "react-emotion";
import mdxComponents from "./mdxComponents";
import Sidebar from "./sidebar";
import ThemeProvider from "./themeProvider";

const ContentWrapper = styled('main')`
  @media only screen and (min-width: 767px) {
    margin-left: 344px;
  }
`;

const Content = styled('article')`
  margin: 2rem 2.5rem 5rem;
`;

const DotGrid = styled('div')`
  background-image: radial-gradient(#858B96 12%, transparent 12%);
  background-color: transparent;
  background-position: 0 0, 50px 50px;
  background-size: 18px 18px;
  width: 100%;
  height: 78px;
  opacity: 0.56;
  display: none;

  @media only screen and (min-width: 767px) {
      display: block;
  }
`;



const Layout = ({children, location}) => (
  <ThemeProvider>
    <MDXProvider components={mdxComponents}>
        <Sidebar location={location}/>
        <ContentWrapper>
          <DotGrid/>
          <Content>
            {children}
          </Content>
        </ContentWrapper>
    </MDXProvider>
  </ThemeProvider>
);

export default Layout;
