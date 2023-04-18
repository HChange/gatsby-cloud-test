import * as React from 'react';
import { HeadFC, PageProps, useStaticQuery, graphql } from 'gatsby';
import { main } from './index.module.less';

const IndexPage: React.FC<PageProps> = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          description
          siteUrl
          title
        }
      }
    }
  `);
  console.log(data);
  return (
    <main className={main}>
      <img src="https://static.hellochange.cn/images/blog/webpack-process.png" alt="ALT" />

      <h1>{data.site.siteMetadata.title}</h1>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
