import { PageProps, graphql } from 'gatsby';
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import Search from '../search';
import { SearchBox } from '../SearchBox';
const searchIndices = [{ name: `Pages`, title: `Pages` }];

// import MdxComponents from './mdx-components';

const Layout = (props: PageProps<Queries.PostQuery>) => {
  console.log(props);
  return (
    <MDXProvider components={{}}>
      {/* <Search indices={searchIndices} /> */}
      <SearchBox />
      <div className="justify-center flex">
        <div className="container bg-slate-300">
          <h1 className="text-3xl font-bold underline Inter">Layout</h1>
          {props.children}
        </div>
      </div>
    </MDXProvider>
  );
};

export default Layout;

export const query = graphql`
  query Post($router: String = "") {
    mdx(frontmatter: { router: { eq: $router } }) {
      body
      excerpt
      frontmatter {
        creator
        date
        hero_image_alt
        name
        router
        slug
        time
      }
      id
    }
  }
`;
