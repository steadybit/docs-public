/*
 * Copyright 2021 steadybit GmbH. All rights reserved.
 */

import { Layout } from "$components";
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer";
import React, { Component } from "react";
import Helmet from "react-helmet";
import config from "../../config";
import { Breadcrumb } from "gatsby-plugin-breadcrumb";

export default class MDXRuntimeTest extends Component {
  render() {
    const { data, pageContext } = this.props;
    const { mdx, allMdx } = data;

    const {
      breadcrumb: { crumbs },
    } = pageContext;
    const title = mdx && mdx.fields ? mdx.fields.title : null;
    const metaTitle =
      mdx && mdx.frontmatter && mdx.frontmatter.metaTitle
        ? mdx.frontmatter.metaTitle
        : title
        ? `${title} - steadybit Docs`
        : null;
    const metaDescription =
      mdx && mdx.frontmatter ? mdx.frontmatter.metaDescription : null;

    let canonicalUrl = config.gatsby.siteUrl;
    canonicalUrl =
      config.gatsby.pathPrefix !== "/"
        ? canonicalUrl + config.gatsby.pathPrefix
        : canonicalUrl;
    canonicalUrl =
      mdx && mdx.fields ? canonicalUrl + mdx.fields.slug : canonicalUrl;

    const enhancedCallbacks = enhanceBreadcrumbs(crumbs, allMdx);
    return (
      <Layout {...this.props}>
        <Helmet>
          {metaTitle ? <title>{metaTitle}</title> : null}
          {metaTitle ? <meta name="title" content={metaTitle} /> : null}
          {metaDescription ? (
            <meta name="description" content={metaDescription} />
          ) : null}
          {metaTitle ? <meta property="og:title" content={metaTitle} /> : null}
          {metaDescription ? (
            <meta property="og:description" content={metaDescription} />
          ) : null}
          {metaTitle ? (
            <meta property="twitter:title" content={metaTitle} />
          ) : null}
          {metaDescription ? (
            <meta property="twitter:description" content={metaDescription} />
          ) : null}
          <link rel="canonical" href={canonicalUrl} />
        </Helmet>
        {enhancedCallbacks.length > 0 ? (
          <>
            <Breadcrumb crumbs={enhanceBreadcrumbs(crumbs, allMdx)} />
            <span className="breadcrumb__separator" aria-hidden="true">
              {" "}
              /
            </span>
          </>
        ) : null}
        <h1 className={"heading h1"}>
          {mdx && mdx.fields ? mdx.fields.title : null}
        </h1>
        <div className={"mainWrapper"}>
          {mdx ? <MDXRenderer>{mdx.body}</MDXRenderer> : null}
        </div>
      </Layout>
    );
  }
}

function findEdge(crumb) {
  return (edge) => {
    const pathname =
      crumb.pathname.length !== 1 && crumb.pathname.substr(-1) === "/"
        ? crumb.pathname.slice(0, -1)
        : crumb.pathname;
    return edge.node.fields.slug === pathname;
  };
}

const enhanceBreadcrumbs = (crumbs, allMdx) => {
  return [
    ...crumbs
      .map((crumb) => {
        const edge = allMdx.edges.find(findEdge(crumb));
        let crumbLabel = crumb.crumbLabel;
        if (edge.node) {
          if (edge.node.frontmatter && edge.node.frontmatter.navTitle) {
            crumbLabel = edge.node.frontmatter.navTitle;
          } else if (edge.node.fields && edge.node.fields.title) {
            crumbLabel = edge.node.fields.title;
          }
        }
        return { ...crumb, crumbLabel };
      })
      .splice(0, crumbs.length - 1),
  ];
};
export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { id: { eq: $id } }) {
      fields {
        id
        title
        slug
      }
      body
      tableOfContents
      parent {
        ... on File {
          relativePath
        }
      }
      frontmatter {
        metaTitle
        metaDescription
      }
    }
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
`;
