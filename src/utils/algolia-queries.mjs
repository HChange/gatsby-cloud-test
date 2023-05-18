import escapeStringRegexp from 'escape-string-regexp';

const pagePath = `layout`;
const indexName = `Pages`;

const pageQuery = `{
		pages: allMdx(filter: {frontmatter: {router: {}}}) {
			edges {
				node {
					frontmatter {
						name
						slug
						router
						time
						creator
						date
						hero_image_alt
					}
					id
					excerpt(pruneLength: 5000)
					internal {
						contentDigest
					}
				}
			}
		}
	}`;

function pageToAlgoliaRecord({ node: { id, frontmatter, ...rest } }) {
  return {
    objectID: id,
    ...frontmatter,
    ...rest,
  };
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
];

export default queries;
