import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `gatsby-learn`,
    siteUrl: `https://www.yourdomain.tld`,
    description: 'Gatsby Learn',
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: `gatsby-plugin-less`,
      // https://github.com/webpack-contrib/css-loader
      options: {
        cssLoaderOptions: {
          camelCase: false,
        },

        modules: {
          mode: 'global',
        },
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
  ],
};

export default config;
