import { graphql } from 'gatsby';
import React from 'react';

const All = ({ data }: any) => {
  return <div>All</div>;
};

export default All;

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { time: ASC } }) {
      edges {
        node {
          frontmatter {
            creator
            name
            slug
            time
          }
        }
      }
    }
  }
`;
