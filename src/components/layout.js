/*
 * Copyright 2020 chaosmesh GmbH. All rights reserved.
 */

import {MDXProvider} from "@mdx-js/react";
import React from "react";
import styled from "react-emotion";
import mdxComponents from "./mdxComponents";
import Sidebar from "./sidebar";
import ThemeProvider from "./themeProvider";

const Wrapper = styled('div')`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 767px) {
    display: block;
  }
`;

const Content = styled('main')`
  display: flex;
  flex-grow: 1;
  margin: 0px 88px;
  margin-top: 1rem;

  @media only screen and (max-width: 1023px) {
    padding-left: 0;
    margin: 0 10px;
    margin-top: 1rem;
  }
`;

const MaxWidth = styled('div')`
  width: 750px;

  @media only screen and (max-width: 50rem) {
    width: 100%;
    position: relative;
  }
`;
const LeftSideBarWidth = styled('div')`
  width: 298px;
`;
const Layout = ({children, location}) => (
  <ThemeProvider location={location}>
    <MDXProvider components={mdxComponents}>
      <Wrapper>
        <LeftSideBarWidth className={'hidden-xs'}>
          <Sidebar location={location}/>
        </LeftSideBarWidth>
        <Content>
          <MaxWidth>{children}</MaxWidth>
        </Content>
      </Wrapper>
    </MDXProvider>
  </ThemeProvider>
);

export default Layout;
