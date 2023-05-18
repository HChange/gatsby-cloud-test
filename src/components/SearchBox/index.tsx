import algoliasearch from 'algoliasearch/lite';
import React from 'react';
import { useMemo } from 'react';
import {
  Configure,
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
  SearchBox as SearchBoxUI,
  useSearchBox,
} from 'react-instantsearch-hooks-web';

function SearchBox() {
  // const { query, refine } = useSearchBox();

  const searchClient = useMemo(
    () => algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID!, process.env.GATSBY_ALGOLIA_SEARCH_KEY!),
    [],
  );

  function Hit({ hit }: any) {
    return (
      <article>
        {/* <img src={hit.image} alt={hit.name} />
				<p>{hit.categories[0]}</p> */}
        <h1>
          <Highlight attribute="name" hit={hit} />
        </h1>
        {/* <p>${hit.price}</p> */}
      </article>
    );
  }
  return (
    <InstantSearch searchClient={searchClient} indexName="Pages" insights>
      {/* ... */}
      <Configure hitsPerPage={5} />
      <SearchBoxUI />
      <Hits hitComponent={Hit} />
      <Pagination />
    </InstantSearch>
  );
}

export { SearchBox };
