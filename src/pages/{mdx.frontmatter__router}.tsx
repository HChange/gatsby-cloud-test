import { graphql } from 'gatsby';
import React from 'react';

const Status = (props: any) => {
  console.log(props);
  return (
    <div>
      mdx静态页面<div>{props.children}</div>
    </div>
  );
};

// props.pageContext的字段变成传参查询。 $frontmatter__router即props.pageContext.pageContext作为参数
export const query = graphql`
  query MyQuery($frontmatter__router: String = "") {
    mdx(frontmatter: { router: { eq: $frontmatter__router } }) {
      id
      frontmatter {
        name
        creator
        time
        slug
        router
        date
      }
    }
  }
`;
export default Status;
