import { GatsbyNode } from 'gatsby';

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const { createRedirect } = actions;
  createRedirect({
    fromPath: `/redirect/img1`,
    toPath: `/img1`,
  });
};
