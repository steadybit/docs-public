import {graphql, StaticQuery} from "gatsby";
import React from "react";
import styled from "react-emotion";
import {ExternalLink} from "react-feather";
import config from '../../../config';
import '../styles.css';
import Tree from './tree';

// eslint-disable-next-line no-unused-vars
const ListItem = styled(({className, active, level, ...props}) => {
  return (
    <li className={className}>
      <a href={props.to} {...props} />
    </li>
  );
})`
  list-style: none;

  a {
    color: #5C6975;
    text-decoration: none;
    font-weight: ${({level}) => (level === 0 ? 700 : 400)};
    padding: 0.45rem 0 0.45rem ${props => 2 + (props.level || 0) * 1}rem;
    display: block;
    position: relative;

    &:hover {
      color: rgb(116, 76, 188) !important;
    }

    ${props =>
  props.active &&
  `
      color: #663399;
      border-color: rgb(230,236,241) !important;
      border-style: solid none solid solid;
      border-width: 1px 0px 1px 1px;
      background-color: #fff;
    `} // external link icon
    svg {
      float: right;
      margin-right: 1rem;
    }
  }
`;

const Divider = styled(props => (
  <li {...props}>
    <hr/>
  </li>
))`
  list-style: none;
  padding: 0.5rem 0;

  hr {
    margin: 0;
    padding: 0;
    border: 0;
    border-bottom: 1px solid #ede7f3;
  }
`;


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
            }
          }
        }
      }
    `}
    render={({allMdx}) => {
      return (
        <aside className={'sideBar'}>
          <ul className={'sideBarUL'}>
            <Tree
              edges={allMdx.edges}
            />
            <Divider/>
            {config.sidebar.links.map((link, key) => {
              if (link.link !== '' && link.text !== '') {
                return (
                  <ListItem key={key} to={link.link}>
                    {link.text}
                    <ExternalLink size={14}/>
                  </ListItem>
                );
              }
            })}
          </ul>
        </aside>
      );
    }}
  />
);

export default SidebarLayout;
