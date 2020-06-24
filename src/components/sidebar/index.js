/*
 * Copyright 2020 chaosmesh GmbH. All rights reserved.
 */

import {graphql, StaticQuery} from "gatsby";
import React from "react";
import logoImg from '../../assets/images/brand.svg';
import Link from '../link';
import './sidebar.css';
import Tree from './tree';


const SidebarLayout = () => {
  const [showToc, setShowToc] = React.useState(false);

  return (
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
          <aside className={'sidebar'}>
            <div className={'sidebar__brand'}>
              <Link to={'https://docs.chaosmesh.io'}>
                <img src={logoImg} alt={'logo'}/>
                <div>Docs</div>
              </Link>
              <button type="button" className={'table-of-contents__toggle'} onClick={() => setShowToc(s => !s)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.25 18.0031H21.75" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2.25 12.0031H21.75" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2.25 6.00305H21.75" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <ul className={'table-of-contents' + (showToc ? ' show' : '')} onClick={() => setShowToc(false)}>
              <Tree edges={allMdx.edges}/>
            </ul>
          </aside>
        );
      }}
    />
  );
};

export default SidebarLayout;
