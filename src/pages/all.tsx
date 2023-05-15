import { Link, graphql } from 'gatsby';
import H from '../content/header.mdx';

import React from 'react';

const All = ({ data }: any) => {
  return (
    <div>
      <H />
      <div>API:{process.env.GATSBY_API_KEY}</div>
      {data.allMdx.nodes.map((node: any) => (
        <article key={node.id}>
          <h2>{node.frontmatter.name}</h2>
          <p>Posted: {node.frontmatter.time}</p>
          <p>{node.excerpt}</p>
          <Link to={`/${node.frontmatter.router}`}>{node.frontmatter.router}</Link>
        </article>
      ))}
    </div>
  );
};

export default All;

export const Hello = ({ data }: any) => <>hello</>;

// 查询的结果将作为当前文件全部导出的props.data
export const query = graphql`
  query All {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          name
          time
          router
        }
        id
        excerpt
      }
    }
  }
`;
