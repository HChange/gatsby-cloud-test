import { graphql } from 'gatsby';
import React from 'react';

const All = ({ data }: any) => {
  return (
    <div>
      {' '}
      {data.allMdx.nodes.map((node: any) => (
        <article key={node.id}>
          <h2>{node.frontmatter.name}</h2>
          <p>Posted: {node.frontmatter.time}</p>
          <p>{node.excerpt}</p>
        </article>
      ))}
    </div>
  );
};

export default All;

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          name
          time
        }
        id
        excerpt
      }
    }
  }
`;
