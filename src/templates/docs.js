/*
 * Copyright 2020 steadybit GmbH. All rights reserved.
 */

import { Layout } from "$components";
import { graphql } from "gatsby";
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer";
import React, { Component } from "react";
import Helmet from "react-helmet";
import config from "../../config";

export default class MDXRuntimeTest extends Component {
  render() {
    const { data } = this.props;
    const { mdx } = data;

    const metaTitle = mdx.frontmatter.metaTitle;
    const metaDescription = mdx.frontmatter.metaDescription;

    let canonicalUrl = config.gatsby.siteUrl;
    canonicalUrl =
      config.gatsby.pathPrefix !== "/"
        ? canonicalUrl + config.gatsby.pathPrefix
        : canonicalUrl;
    canonicalUrl = canonicalUrl + mdx.fields.slug;

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
        <h1 className={"heading h1"}>{mdx.fields.title}</h1>
        <div className={"mainWrapper"}>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </div>
      </Layout>
    );
  }
}

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
        }
      }
    }
  }
`;
