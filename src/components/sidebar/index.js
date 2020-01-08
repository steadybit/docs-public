/*
 * Copyright 2020 chaosmesh GmbH. All rights reserved.
 */

import {graphql, StaticQuery} from "gatsby";
import React from "react";
import './sidebar.css';
import Tree from './tree';

const SidebarLayout = () => (
  <StaticQuery
    query={graphql`
      query {
        allMdx {
          edges {
            node {
              fields {
                slug
                title
              }
              frontmatter {
                navTitle
              }
            }
          }
        }
      }
    `}
    render={({allMdx}) => {
      return (
        <aside className={'sideBar'}>
          <ul className={'sideBarUL'}>
            <Tree edges={allMdx.edges}/>
          </ul>
        </aside>
      );
    }}
  />
);

export default SidebarLayout;
