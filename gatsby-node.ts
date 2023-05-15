import { GatsbyNode } from 'gatsby';
import { resolve } from 'path';
import Layout from './src/components/Layout';

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const { createRedirect, createPage } = actions;
  createRedirect({
    fromPath: `/redirect/img1`,
    toPath: `/img1`,
  });

  const { data } = await graphql<any>(`
    query AllMdxQuery {
      allMdx {
        nodes {
          id
          frontmatter {
            router
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  // console.dir(data);
  data?.allMdx?.nodes?.forEach((item: any) => {
    const router = item.frontmatter?.router;
    router &&
      createPage({
        path: `/layout/${router}`,
        component: `${resolve('./src/components/Layout/index.tsx')}?__contentFilePath=${item.internal.contentFilePath}`,
        context: { router },
      });
  });
};

// export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
//   actions.createTypes(`

//   `);
// };
