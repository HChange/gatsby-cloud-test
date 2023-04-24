import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';

const Status = (props: any) => {
  console.log(props);
  const { data } = props;
  // 等价于：data.mdx.frontmatter.hero_image.childImageSharp.gatsbyImageData
  const image = getImage(data.mdx.frontmatter.hero_image);

  return (
    <div>
      <div>{image && <GatsbyImage image={image} alt={data.mdx.frontmatter.hero_image_alt} />}</div>
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
        hero_image_alt
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`;
export default Status;
