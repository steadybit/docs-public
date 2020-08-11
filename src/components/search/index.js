/*
 * Copyright 2020 steadybit GmbH. All rights reserved.
 */

import algoliasearch from "algoliasearch/lite";
import React, {createRef, useEffect, useState} from "react";
import {Configure, connectStateResults, Hits, Index, InstantSearch,} from "react-instantsearch-dom";
import config from "../../../config.js";
import * as hitComps from "./hitComps";
import Input from "./input";
import './search.css';
import {PoweredBy} from "./styles";

const Results = connectStateResults(
  ({searchState: state, searchResults: res, children}) =>
    res && res.query && res.nbHits > 0 ? children : `No results for '${state.query}'`
);

const useClickOutside = (ref, handler, events) => {
  if (!events) events = [`mousedown`, `touchstart`];
  const detectClickOutside = event =>
    !ref.current.contains(event.target) && handler();
  useEffect(() => {
    for (const event of events)
      document.addEventListener(event, detectClickOutside);
    return () => {
      for (const event of events)
        document.removeEventListener(event, detectClickOutside);
    };
  });
};

export default function SearchComponent({indices, collapse}) {
  const ref = createRef();
  const [query, setQuery] = useState(``);
  const [focus, setFocus] = useState(false);
  const searchClient = algoliasearch(
    config.header.search.algoliaAppId,
    config.header.search.algoliaSearchKey
  );
  useClickOutside(ref, () => setFocus(false));
  const displayResult = (query.length > 0 && focus) ? 'showResults' : 'hideResults';
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indices[0].name}
      onSearchStateChange={({query}) => setQuery(query)}
      root={{props: {ref}}}
    >
      <Input onFocus={() => setFocus(true)} {...{collapse, focus}} />
      <div className={'hitWrapper ' + displayResult}>
        {indices.map(({name, title, hitComp}) => {
          return (
            <Index key={name} indexName={name}>
              <Results>
                <Hits hitComponent={hitComps[hitComp](() => setFocus(false))}/>
              </Results>
            </Index>
          );
        })}
        <PoweredBy/>
      </div>
      <Configure hitsPerPage={5}/>
    </InstantSearch>
  );
}
